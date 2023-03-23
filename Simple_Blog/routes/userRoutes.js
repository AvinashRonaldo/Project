const express = require("express");
const bcrypt = require('bcryptjs');
const isAuthenticated = require("../Middlewares/auth");
const router = express.Router();
const User = require(__dirname+"/../models/user");
const stories = require('../Controllers/story');var session;var story;

router.get("/login",(req,res) => {
    res.render("login");
});

router.get("/register",(req,res) => {
    res.render("register");
});

router.get("/welcome",isAuthenticated,async(req,res) => {
    const username = req.session.userid;
    story = await stories(username);
    res.render("welcome",{story:story});
});

router.post("/login",async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
    const user =await User.find({username});
    if(user[0].password == password){
        session = req.session
        session.userid = req.body.username;
        story = await stories(username);
        res.render("welcome",{story:story});
    }
    else {
        res.send("Invalid details");
    }
    }catch(err){
        console.log(err);
    } 
});

router.get("/logout",async(req,res) => {
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
    res.redirect("/login");
})

router.post("/register",async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const dob = req.body.dob;
    const email = req.body.email;
    const isPresent = await User.find({username});
    console.log(isPresent);
    if(isPresent.length!=0){
        res.status(400).send("Username already present");
    }
    else {
    const user = await User.create(req.body);
    res.redirect("/login");
    }
});

module.exports = router;

