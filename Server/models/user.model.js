const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    // UserId : {type: Number, required: true},
    walletAddress: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);