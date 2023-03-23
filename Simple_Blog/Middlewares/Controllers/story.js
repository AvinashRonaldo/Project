const express = require('express');
const Story = require('../models/story');
var stories;

stories = async(username) => {
    const story=await Story.find({username});
    return story;
}

module.exports = stories;