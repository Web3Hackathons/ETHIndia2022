const express = require('express');
const router = express.Router();

// Require the controllers
const test_controller = require('../controllers/test.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', test_controller.test);
router.post('/post', test_controller.postTest);

module.exports = router;