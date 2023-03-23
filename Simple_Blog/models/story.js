const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    storyTitle : String,
    description : String,
    author : String,
    publishedDate : {
        type:Date,
        default : Date.now
    }
})

storySchema.post("save",() => {
    console.log("Story Saved to DB");
})

const Story = mongoose.model("Story",storySchema);

module.exports = Story;