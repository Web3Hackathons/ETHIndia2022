const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// routes
const test = require("./routes/test.route");
const user = require("./routes/user.route");
const creator = require("./routes/creator.route");
const blog = require("./routes/blogs.route");
const like = require("./routes/likes.route");

// api
app.use("/api/users", user);
app.use("/api/creators", creator);
app.use("/api/blogs", blog);
app.use("/api/likes", like);

app.use("/", require("./routes/hello"));
app.use("/test", test);

// Connect to mongodb
//const db = require('./config/keys').mongoURI;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
