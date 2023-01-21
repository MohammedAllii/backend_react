const express = require('express')
const colors = require('colors')
const cors = require('cors');



const dotenv = require('dotenv').config({ path: './.env' }); 
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
connectDB()
const app=express()
// Enable CORS for all routes
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/stories', require('./routes/storieRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use(errorHandler)


app.listen(port , ()=> console.log (`server started on port ${port}`))