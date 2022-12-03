const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CreatorSchema = new Schema({
    // UserId : {type: Number, required: true},
    walletAddress: { type: String, required: true },
    username: { type: String },
    name: { type: String },
    profilePic: { type: String },
    coverImg: { type: String },
    about: { type: String },
    joinedDate: { type: Date, default: Date.now },
    nFollowers: { type: Number, default: 0 },
    SocialLinks: [
        {
            _socialId: { type: String },
            platformName: { type: String },
            profileLink: { type: String },
        }
    ],
    followerInfo: [
        {
            userId: { type: String },
            fUsername: { type: String },
            fWalletAddress: { type: String },
        },
    ]
},
);

module.exports = mongoose.model('Creator', CreatorSchema);