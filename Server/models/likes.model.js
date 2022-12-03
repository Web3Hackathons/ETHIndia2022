const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LikesSchema = new Schema({
  blogCID: { type: String, required: true }, // Reference to blogs or comments
  nLikes: { type: Number, default: 0 },
  likeTime: { type: Date, default: Date.now },
  author: {
    walletAddress: { type: String, required: true },
    profilePic: { type: String },
    name: { type: String },
  },
  likedUsers: [{
    walletAddress: { type: String, required: true }
  }]
});

module.exports = mongoose.model("like", LikesSchema);
