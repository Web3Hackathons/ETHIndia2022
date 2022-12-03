const express = require("express");
const router = express.Router();

const likes_controller = require("../controllers/likes.controller");

router.get("/", likes_controller.getLikes);
router.post("/add-likes", likes_controller.addLikes);
router.post("/get-likes-byCID", likes_controller.getLikesByCID);
//router.post("/update-likes", likes_controller.updateLikesByCID);

module.exports = router;
