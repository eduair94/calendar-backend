import express from 'express'
import dotenv from 'dotenv'
import AuthRoute from './routes/auth'
import { dbConnection } from './database/config'
import cors from 'cors'
dotenv.config({})

const app = express()
void dbConnection()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/api/auth', AuthRoute)

const port = !isNaN(parseInt(process.env.PORT as string)) ? parseInt(process.env.PORT as string) : 3000
app.listen(port, () => {
  console.log(`Express server listening to port ${port}`)
})
