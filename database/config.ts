import mongoose from 'mongoose'
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string)
    console.log('Database online')
  } catch (e) {
    console.error(e)
    throw new Error('Error initializing database')
  }
}
