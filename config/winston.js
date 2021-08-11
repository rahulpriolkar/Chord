const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'silly',
        filename: '/mnt/c/Users/priol/rahulpriolkar/Documents/Projects/Chord/logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: true,
        colorize: true
    }
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
    format: combine(timestamp(), json(), myFormat),
    transports: [new transports.File(options.file)],
    exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
