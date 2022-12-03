const express = require("express");
const router = express.Router();

const creator_controller = require("../controllers/creator.controller");

router.get("/", creator_controller.getCreators);
router.post("/create-profile", creator_controller.createCreatorProfile);
router.post("/get-creator-byWallet", creator_controller.getCreatorByWallet);

module.exports = router;
