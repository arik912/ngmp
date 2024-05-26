import express from 'express';
import bodyParser from 'body-parser';
import {RequestContext} from '@mikro-orm/core';
/*
import { IncomingMessage, ServerResponse } from 'http';
// the response-time package/middleware uses 'on-request', so it is not needed as a dependency if using this package
import responseTime from 'response-time';
 */

import appConfig from './src/config/app.config';
import logger from './src/core/logger';
import {errorHandler, requestLogger} from './src/middlewares';
import {rootRouter} from './src/router';
import {container, init} from './init';
import * as http from "http";
import {handleTerminationSignal} from "./src/utils/graceful-shutdown";

init().then(() => {
    const app = express();

    // The requestLogger must be the first app middleware
    // app.use(responseTime((req: IncomingMessage, res: ServerResponse, time: number) => {
    //     logger.info(`[${ new Date().toUTCString() }] ${ req.method } ${ req.url } - ${ time }ms`);
    // }));
    app.use(requestLogger);

    app.use(bodyParser.json());
    app.use((req, res, next) => RequestContext.create(container.orm.em, next));
    app.use(rootRouter);

    // the errorHandler must be the last app middleware
    app.use(errorHandler);

    const server: http.Server = app.listen(appConfig.port, () => {
        logger.info(`Server is started: http://localhost:${ appConfig.port }`);
    });

    // Handle shutdown events:
    /*
    // @link: https://github.com/gajus/http-terminator/tree/master
    import {
      createHttpTerminator,
    } from 'http-terminator';

    const httpTerminator = createHttpTerminator({
      server,
    });

    await httpTerminator.terminate()
 */
    ['SIGTERM', 'SIGINT'].forEach((signal) => {
        process.on(signal, handleTerminationSignal(server)); //
        /*
            process.on(signal, async () => {
                await httpTerminator.terminate();
            });
         */
    });
});
