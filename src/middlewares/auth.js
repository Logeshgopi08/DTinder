const Jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
  // console.log(req.body);
  
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const DecodedToken = await Jwt.verify(token, "Atchaya@Tinder$1603");
    const { _id } = DecodedToken;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User is Not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error" + error.message);
  }
};

module.exports = { UserAuth };
