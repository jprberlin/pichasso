const config = require('config');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const winston = require('winston');

const dir = config.get('Logging.Directory');
const env = process.env.NODE_ENV || 'development';
const tsFormat = () => (new Date()).toLocaleTimeString();

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      silent: env !== 'development',
      level: env === 'development' ? 'debug' : 'none',
    }),
    new (DailyRotateFile)({
      filename: `${dir}-pichasso.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'info' : 'error',
      json: false,
    }),
  ],
});

module.exports = logger;
