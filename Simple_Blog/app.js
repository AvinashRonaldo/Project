const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
dotenv.config();
const cookieParser = require('cookie-parser')
const userRoutes = require(__dirname+"/routes/userRoutes");
const storyRoutes = require(__dirname+"/routes/storyRoutes");

const dbURI = process.env.DB_URI || 3000;
const port = process.env.APP_PORT;

const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery",true);
mongoose.connect(dbURI);
const conn = mongoose.connection;
conn.on("connected",()=> console.log("Connected"));
conn.on("error",() => console.log("Error Occured"));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret : process.env.SECRET,
    saveUninitialized:true,
    cookie : {maxAge :8640000},
    resave : false
}))


app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(port,()=> {
    console.log("Listening");
});

app.get("/",(req,res) => {
    res.send("Welocome to my First page");
});
app.use(storyRoutes);
app.use(userRoutes);

