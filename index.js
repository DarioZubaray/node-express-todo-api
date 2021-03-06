const express = require('express')
const cors = require('cors')
const logger = require('./src/config/logger')
const { dbConnection } = require('./src/database/config')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT || 3000
const app = express()
dbConnection()

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())

app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/todo', require('./src/routes/todo'))

app.listen(port, () => {
  logger.info(`Example app listening at ${require('ip').address()}:${port}`)
})

module.exports = app
