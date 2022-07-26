const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

const AuthRouter = require('./Auth/Auth.index')
const ErrorHandlerMiddlewares = require('./Middlewares/Errors.Middlewares');
const dbConnect = require('./db')


const PORT = process.env.PORT||3000;
const app = express();

app.use(morgan('dev'))
app.use(cors())

require('./Scripts/CreateAdmin.script');
dbConnect()

app.get('/', (req,res, next)=>{
    res.json({
        message: 'Welcome to the API for shopping manager!!'
    })
})

app.use('/api/v1/auth', AuthRouter);
app.use(ErrorHandlerMiddlewares.notFound);
app.use(ErrorHandlerMiddlewares.errorHandler);       


app.listen(PORT, () => {
    console.log("Started application successfully at http://localhost:"+PORT)
})