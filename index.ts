import express from 'express';
import dotenv from 'dotenv'
dotenv.config({})

const app = express();
app.use(express.static('public'))

const port = process.env.PORT || 3123;
app.listen(port, () => {
    console.log(`Express server listening to port ${port}`)
})