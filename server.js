import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'

dotenv.config()
const port = process.env.PORT || 5000

import productRoute from './routes/product.route.js'
import paymentRoute from './routes/payment.route.js'
import userRoute from './routes/user.route.js'
import { errorHandler } from './middleware/error.middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://autoexpert.netlify.app'],
  })
)

app.use('/api/products', productRoute)
app.use('/api/paystack', paymentRoute)
app.use('/api/users', userRoute)

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from autoXpert',
  })
})

app.use(errorHandler)
app.listen(port, () => {
  connectDB()
  console.log(`Server running on http://localhost:${port}/api`)
})
