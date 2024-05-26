const winston = require('winston');

import appConfig from '../../config/app.config';

const logger = winston.createLogger({
  level: appConfig.isProdEnv ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.prettyPrint(),
  ),
  transports: [
    // Depending on requirements and deployment platforms console transport can be used or not
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      filename: 'error.log',
      level: 'error',
    }),
  ],
});

// Write all logs with importance level of `info` or less to `combined.log` for non-prod env
// Depending on requirements this log file can be used in production instead of stdout (console) log
if (!appConfig.isProdEnv) {
  logger.add(
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      filename: 'combined.log',
    }),
  );
}

export default logger;
