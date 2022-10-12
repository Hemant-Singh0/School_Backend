const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mail: { type: String, required: true },
    age: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, min: 5, max: 10 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
