const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
dotenv.config();
const port = process.env.PORT || 3000 ;


const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get("/",(req,res) => {
    res.render("home");
})

function isValid(query){
    if(query.split(".").length!=4){
        return false;
    }
    return true;
}

app.post("/get-info",async(req,res) => {
    try {
    const query = req.body.query;
    console.log(query);
    let addr = `http://ip-api.com/json/${query}`;
    const data = await axios.get(addr);
    res.send(data.data);
    }
    catch(err){
        console.log(err);
    }
});

app.listen(port,() => {
    console.log("Server is Up and Running");
})




