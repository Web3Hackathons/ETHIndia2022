const express = require("express");
const router = express.Router();

const likes_controller = require("../controllers/likes.controller");

router.get("/", likes_controller.getLikes);
router.post("/add-like", likes_controller.addLike);
router.post("/get-likes-byCID", likes_controller.getLikesByCID);
//router.update("/update-likes", likes_controller.updateLikesByCID);

module.exports = router;