const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LikesSchema = new Schema({
  blogCID: { type: String, required: true }, // Reference to blogs or comments
  likeTime: { type: Date, default: Date.now },
  authorwalletAddress: { type: String, required: true },
  likedUsers: [
    {
      walletAddress: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("like", LikesSchema);
