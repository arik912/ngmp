import http from 'http';
import {Duplex} from 'stream';

// Graceful shutdown:
import appConfig from '../config/app.config';
import logger from '../core/logger';

let isTerminating: boolean = false;
let sockets: Set<Duplex>;

export function handleTerminationSignal(server: http.Server): () => void {
  if (!sockets) {
    // register request/connection sockets:
    sockets = new Set<Duplex>();

    server.on('connection', (socket) => {
      if (isTerminating) {
        socket.destroy();
      } else {
        // register connections
        sockets.add(socket);

        // remove/filter closed connections
        socket.once('close', () => {
          logger.debug('close socket connection');
          sockets.delete(socket);
        });
      }
    });
  }

  return () => {
    // already terminating
    if (isTerminating) {
      logger.debug('Termination has already been triggered');
      return isTerminating;
    }

    logger.debug('Received kill signal, shutting down gracefully');

    isTerminating = true;

    server.on('request', (incomingMessage, outgoingMessage) => {
      if (!outgoingMessage.headersSent) {
        outgoingMessage.setHeader('connection', 'close');
      }
    });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, appConfig.forceShutdownTimeout);

    // end current connections
    for (const socket of sockets) {
      socket.end();
    }

    // then destroy connections
    setTimeout(() => {
      for (const socket of sockets) {
        socket.destroy();
        sockets.delete(socket)
      }
    }, appConfig.forceSocketTerminationTimeout);

    server.close((error) => {
      if (error) {
        logger.error('An error occurred while closing server connections.', error);
        process.exit(1);
      } else {
        logger.debug('Closed out remaining connections.');
        process.exit(0);
      }
    });
  }
}
