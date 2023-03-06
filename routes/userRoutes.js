const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require(__dirname+"/../models/user");

router.get("/login",(req,res) => {
    res.render("login");
});

router.get("/register",(req,res) => {
    res.render("register");
});

router.post("/login",async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.params);
});

router.post("/register",async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const dob = req.body.dob;
    const email = req.body.email;
    const hpass = await bcrypt.hash(password,10);
    console.log(hpass);
    const user = User.create()
});

module.exports = router;

