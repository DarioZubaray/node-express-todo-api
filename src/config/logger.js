const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/todo-app.log' }),
  ],
})

module.exports = logger
