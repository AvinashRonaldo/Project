const express = require('express');
const Story = require('../models/story');
const isAuthenticated = require('../Middlewares/auth');
const stories = require('../Controllers/story');
const router = express.Router();


router.get("/create_story",isAuthenticated,async(req,res)=> {
    const story = stories(req.body.username);
    res.render("create_story",{story:story});
});



router.post("/create_story",isAuthenticated,async (req,res)=> {
    req.body.author = req.session.userid; 
    const story = await Story.create(req.body);
    res.redirect("/welcome");
})




module.exports = router;