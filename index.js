const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const port = process.env.PORT || 3000

app.get('/', require('./routes/todo'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})