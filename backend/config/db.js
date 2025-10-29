import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log('There was an error connecting with DB', error)
    process.exit(1)
  }
}
