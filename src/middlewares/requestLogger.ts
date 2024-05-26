import {NextFunction, Request, Response} from 'express';
import {ServerResponse} from 'http';
import onHeaders from 'on-headers';

import logger from '../core/logger';

function logRequestTime(req: Request, startTime: bigint, /* consoleTimeId?: string */): (this: ServerResponse) => void {
  return function () {
    const endTime = process.hrtime.bigint()
    const responseTimeInNSec: string = (endTime - startTime).toString();
    const shortResponseTimeInMSec = (+responseTimeInNSec * 0.000001).toFixed(3)

    if (!this.getHeader('X-Response-Time')) {
      this.setHeader('X-Response-Time', shortResponseTimeInMSec);
    }

    logger.info(`[${ new Date().toUTCString() }] ${ req.method } ${ req.path } - ${ shortResponseTimeInMSec }ms`);
    // Other things can be omitted if using console.time
    // console.timeEnd(consoleTimeId)
  }
}

/**
 * A simple response time logger
 *
 * User response-time package as a ready-to-go solution
 * @link: https://github.com/expressjs/response-time
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  /*
    // another simple working but a bit slower and not as much convenient solution is to use the console.time
    const consoleTimeId = `INFO: [${ new Date().toUTCString() }] ${ req.method } ${ req.path }`;
    console.time(consoleTimeId)
   */
  // @link: https://nodejs.org/api/process.html#processhrtimebigint
  const startAt: bigint = process.hrtime.bigint();
  onHeaders(res, logRequestTime(req, startAt, /* consoleTimeId */));
  next();
}
