const Blog = require('../models/blogs.model');

// Get all Blogs
exports.getBlogs = async function (req, res) {
    const data = await Blog.find();
    res.status(200).json(data);

}

// create Blogs
exports.createBlog = function (req, res) {
    const data = req.body;

    const {
        blogCID,
        title,
        heroImg,
        postTime,
        nLikes,
        numComments,
        author
    } = data;

    Blog.findOne({ blogCID })
        .then(blog => {
            if (blog) {
                error = 'Blog Already Exists';
                return res.status(400).json({ error })
            } else {
                const newBlog = new Blog({
                    blogCID,
                    title,
                    heroImg,
                    postTime,
                    nLikes,
                    numComments,
                    author
                });

                const response = Blog.create(newBlog);

                res.status(200).json({
                    success: true,
                    data: newBlog
                })
            }
        })
}


// Get BLog by CID
exports.getBlogByCID = function (req, res) {
    const { blogCID } = req.body;

    Blog.findOne({ blogCID })
        .then(blog => {
            if (!blog) {
                error = "Blog Not Found"
                return res.status(404).json({ error })
            } else {
                res.status(200).json(blog)
            }
        })
        .catch(error => res.status(404).json({ error }));
}