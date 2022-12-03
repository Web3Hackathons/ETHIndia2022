const User = require('../models/user.model');

//Get All Users
exports.getUsers = async function (req, res) {
    const data = await User.find()
    res.status(200).json(data);

};

// Create User
exports.createUser = async function (req, res) {
    const data = req.body;

    const { walletAddress, username, name, profilePic, joinedDate } = data;

    User.findOne({ walletAddress })
        .then(user => {
            if (user) {
                error = 'User Already Exists';
                return res.status(400).json({ error });
            }
            else {
                const newUser = new User({
                    walletAddress,
                    username,
                    name,
                    profilePic,
                    joinedDate
                });

                const response = User.create(newUser)

                res.json({
                    success: true,
                    status: '200',
                    data: newUser
                })

            }
        });

}


// Get user by wallet address
exports.getUserByWallet =  function (req, res) {

    const { walletAddress } = req.body;

    User.findOne({ walletAddress })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User Not Found" });
            }
            else {
                res.status(200).json(user);
            }
        })
        .catch(err => res.status(404).json({ error: err }));

};