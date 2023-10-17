const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./router/index')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})