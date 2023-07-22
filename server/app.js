const express = require('express')
const registrationRoutes = require('./routes/registrationRoutes')
const userRouter = require('./routes/userRoutes')
const connectDB = require('./db/db')
const dotenv = require('dotenv')
const cors = require('cors')
const { default: axios } = require('axios')
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
}

const app = express()
app.use(cors(corsOptions))
app.use(cors())
dotenv.config()
connectDB()

app.use(express.json())
const PORT = 7000

app.get('/', (req, res) => res.send('app initiallize'))
app.use('/otp/', registrationRoutes)
app.use('/users/', userRouter)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
