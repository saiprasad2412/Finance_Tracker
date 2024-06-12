const express= require('express');
const cors =require('cors');
const connectDB = require('./db/db');
require('dotenv').config()
const {reddirSync}=require('fs');
// const transactionRouter = require('./routes/transactions.routes.js');
const router = require('./routes/transactions.routes.js');
const PORT =process.env.PORT || 5000;
const app =express();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use('/api/v1/transactions',router)
const server=()=>{
    connectDB().then(()=>{
        console.log('Db connected')
    })
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}

server()