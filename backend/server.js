import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import productRouter from './routes/productRoute.js'
const app = express()
dotenv.config()

app.use(express.json())
app.use('/api', productRouter)

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
  connectDB()
  console.log(`App started on port ${PORT}`)
})
