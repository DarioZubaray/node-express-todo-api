const express = require('express')
const { dbConnection } = require('./database/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000
const app = express()
dbConnection()

app.use( express.json() )

app.use('/api/todo', require('./routes/todo'))

app.listen(port, () => {
  console.log(`Example app listening at ${require("os").hostname}:${port}`)
})
