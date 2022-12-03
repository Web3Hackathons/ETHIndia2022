const Creator = require('../models/creator.model');

// Get all Creators
exports.getCreators = async function (req, res) {
    const data = await Creator.find();
    res.status(200).json(data);

}

// create Creator Profile
exports.createProfile = function (req, res) {
    const data = req.body;

    const { walletAddress, username, name, profilePic, coverImg, about, joinedDate, nFollowers, SocialLinks, followerInfo } = data;

    Creator.findOne({ walletAddress })
        .then(creator => {
            if (creator) {
                error = 'Profile Already Exists';
                return res.status(400).json({ error })
            } else {
                const newProfile = new Creator({
                    walletAddress,
                    username,
                    name,
                    profilePic,
                    coverImg,
                    about,
                    joinedDate,
                    nFollowers,
                    SocialLinks,
                    followerInfo
                });

                const response = Creator.create(newProfile);

                res.status(200).json({
                    success: true,
                    data: newProfile
                })
            }
        })
}

// Get Creator by Wallet
exports.getProfileByWallet = function (req, res) {
    const { walletAddress } = req.body;

    Creator.findOne({ walletAddress })
        .then(creator => {
            if (!creator) {
                error = "Creator Not Found"
                return res.status(404).json({ error })
            } else {
                res.status(200).json(creator)
            }
        })
        .catch(error => res.status(404).json({ error }));
}