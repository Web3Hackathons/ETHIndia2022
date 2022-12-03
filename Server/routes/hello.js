const express = require("express");
(router = express.Router()), (hello = require("../controllers/hello"));

router.get("/", hello.hello);

module.exports = router;
