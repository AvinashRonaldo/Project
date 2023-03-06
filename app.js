const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const userRoutes = require(__dirname+"/routes/userRoutes");
const dbURI = "mongodb+srv://Avinash:Avinash@nodeapp0.p9vypw4.mongodb.net/test?retryWrites=true&w=majority"


const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery",true);
mongoose.connect(dbURI);
const conn = mongoose.connection;
conn.on("connected",()=> console.log("Connected"));
conn.on("error",() => console.log("Error Occured"));
const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000,()=> {
    console.log("Listening");
});

app.get("/",(req,res) => {
    res.send("Welocome to my First page");
});

app.use(userRoutes);

