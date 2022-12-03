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

// api
app.use("/", require("./routes/hello"));
app.use("/test", test);

// Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
