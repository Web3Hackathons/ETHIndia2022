const express = require("express");
const router = express.Router();

const creator_controller = require("../controllers/creator.controller");

router.get("/", creator_controller.getCreators);
router.post("/create-profile", creator_controller.createProfile);
router.post("/get-profile-byWallet", creator_controller.getProfileByWallet);

module.exports = router;
