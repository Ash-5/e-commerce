const winston = require("winston");
require("winston-daily-rotate-file");

const transport_console = new (winston.transports.Console)();

const transport_info = new (winston.transports.DailyRotateFile)({
    filename: 'info-%DATE%.log',
    level: 'info',
    datePattern: 'YYYY-MM-DD'
});

const transport_error = new (winston.transports.DailyRotateFile)({
    filename: 'error-%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD'
});

const logger = winston.createLogger({
    transports: [
        transport_console,
        transport_info,
        transport_error
    ]
});

module.exports = logger;
