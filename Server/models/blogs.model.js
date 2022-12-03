const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
    blogCID: { type: String },
    title: { type: String },
    heroImg: { type: String },
    content: { type: String }, //content
    postTime: { type: Date, default: Date.now },
    nLikes: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    author: {
        // UserId : {type: Number},
        walletAddress: { type: String },
        profilePic: { type: String },
        name: { type: String },
    }
    
}
);


module.exports = mongoose.model('Blog', BlogSchema);