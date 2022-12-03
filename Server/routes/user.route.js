const express = require('express');
const router = express.Router();

// Require the controllers
const user_controller = require('../controllers/user.controller');


router.get('/', user_controller.getUsers);
router.post('/create-user', user_controller.createUser);
router.post('/get-user-byWallet', user_controller.getUserByWallet);


module.exports = router;