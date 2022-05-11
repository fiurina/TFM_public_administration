const winston = require('winston');

const options = {
  file: {
    level: 'info',
    filename: 'combined.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    format: winston.format.combine(
      winston.format.colorize({
        message: true
      }),
      winston.format.simple()
    )
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;