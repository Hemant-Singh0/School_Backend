const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
const CONFIG = require("./config.json");
require("./connection/dataBase");

const fileUpload = require("express-fileupload"); //cloudinary upload

const app = express();
app.use(morgan("dev"));

app.use(
  fileUpload({
    useTempFiles: true,
  })
); //cloudinary upload

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/teacher", require("./routers/teacher/index"));
// app.use("/teacher", require("./teacher/routers/authRouter"));

const port = CONFIG.PORT || 8080;

app.get("/", (req, res) => res.send("Hello World with Express"));

app.listen(port, function () {
  console.log(`Server is up and running on ${port}....`);
});
