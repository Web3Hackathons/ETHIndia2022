const Likes = require("../models/likes.model");

// Get all likes
exports.getLikes = async function (req, res) {
  const data = await Likes.find();
  res.status(200).json(data);
};

// Add Likes
exports.addLike = function (req, res) {
  const data = req.body;

  const { blogCID, likeTime, authorwalletAddress, likedUsers } = data;

  Likes.findOne({ blogCID }).then((blog) => {
    if (blog) {
      blog.likedUsers.addToSet(likedUsers);
      blog.save();
      res.status(200).json({
        success: true,
      });
    } else {
      const likes = new Likes({
        blogCID,
        likeTime,
        authorwalletAddress,
        likedUsers,
      });

      const response = Likes.create(likes);

      res.status(200).json({
        success: true,
        data: likes,
      });
    }
  });
};

// Get Likes by CID
exports.getLikesByCID = function (req, res) {
  const { blogCID } = req.body;

  Likes.find({ blogCID })
    .then((blog) => {
      if (!blog.length) {
        error = "Blog Not Found";
        return res.status(404).json({ error });
      } else {
        res.status(200).json(blog);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

//Update Likes by CID
// exports.updateLikesByCID = function (req, res) {
//   Likes.Update(
//     { blogCID: req.body.blogCID },
//     { $push: { likedUsers: req.body.likedUsers[0].walletAddress } },
//     function (error, res) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(res);
//       }
//     }
//   );
// };
