const express = require("express");
const router = express.Router();

const blogs_controller = require("../controllers/blogs.controller");

router.get("/", blogs_controller.getBlogs);
router.post("/create-blog", blogs_controller.createBlog);
router.post("/get-blog-byCID", blogs_controller.getBlogByCID);
router.post("/get-all-blog-byWallet", blogs_controller.getAllBlogByWallet);

module.exports = router;
