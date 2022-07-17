const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const userRouter = require('./src/modules/user/user.route')

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('user management service is online...')
})

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`user management service is online... [PORT:${PORT}]`)
})