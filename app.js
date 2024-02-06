const express = require('express')
const app = express()
const session=require('express-session')
const bodyParser=require('body-parser')
const path = require('path')
require('dotenv').config()
const {v4:uuidv4}=require('uuid')
const router=require('./router/user')
const morgan=require('morgan')
const nocache=require('nocache')

// const mongoose = require('mongoose')
app.use(nocache())
const PORT=process.env.PORT

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));

const user = require('./model/db')

//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(session({
    secret:uuidv4(),
    saveUninitialized:true,
    resave:false

}))
app.use(morgan('tiny'));

app.set('view engine', 'ejs')
//style



//route
app.use('/',router)


app.listen(PORT, () => {
    console.log(`server start running http://localhost:${PORT}`)
});