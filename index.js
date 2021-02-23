const express = require('express');
const logger = require('./src/config/logger');
const { dbConnection } = require('./src/database/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000
const app = express()
dbConnection()

app.use( express.json() )

app.use('/api/todo', require('./src/routes/todo'))

app.listen(port, () => {
  logger.info(`Example app listening at ${require("ip").address()}:${port}`)
})

module.exports = app