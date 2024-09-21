const mongoose = require("mongoose");
const validator = require("validator");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 5,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Not Valid" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is Not Strong" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);


userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await Jwt.sign({ _id: user._id }, "Atchaya@Tinder$1603");

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordhash = user.password;

  const isValidPassword= await bcrypt.compare(passwordInputByUser, passwordhash);

  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
