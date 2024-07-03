import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'
import cors from'cors'
import cookieParser from'cookie-parser'
import productRouter from './routes/product.js'
import userRouter from './routes/user.js';


dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.use('/api/user', userRouter)
app.use("/api/product", productRouter)



// connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });


const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})