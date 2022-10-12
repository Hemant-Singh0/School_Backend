const req = require("express/lib/request");
const User = require("../../model/teacher/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "jwt";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df6ycegni",
  api_key: "483586693864986",
  api_secret: "gyGZlNSySX5U-yhJMLnPcEaIrGM",
  secure: true,
});

const signup = async (req, res) => {
  try {
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const pass = await bcrypt.hash(req.body.password, 10);
      const response = {
        name: req.body.name,
        mail: req.body.mail,
        age: req.body.age,
        number: req.body.number,
        password: pass,
        image: result.url,
      };
      const resultt = await User.findOne({ mail: response.mail });
      if (resultt) {
        return res.send({
          status: 400,
          message: "Mail Already Exist!!!... Please Try Different mail",
        });
      } else {
        const user = await User.create(response);
        jwt.sign(
          { user },
          jwtKey,
          { expiresIn: "2h" },
          async (error, token) => {
            if (error) {
              return res.status(500).send({
                status: 500,
                message: "Something went wrong, please try after some time",
                error: error.message,
              });
            } else {
              res.send({
                status: 200,
                message: "User Registered Successfully",
                data: user,
                auth: token,
              });
            }
          }
        );
      }
    });
    // }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const password = req.body.password;
    const respon = await User.findOne({ mail: req.body.mail });
    if (respon) {
      const response = {
        id: respon._id,
        mail: respon.mail,
      };
      const passchq = await bcrypt.compare(password, respon.password);
      if (passchq) {
        return res.status(200).send({
          status: 200,
          message: "Login successful",
          data: response,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Invalid password",
          data: response,
        });
      }
    } else {
      return res
        .status(300)
        .send({ status: 300, message: "Invalid User", error: error.message });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Invalid User",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
