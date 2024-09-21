const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter the First and Last Name properly ");
  } else if (!validator.isEmail) {
    throw new Error("Enter Valid Email");
  } else if (!validator.isStrongPassword) {
    throw new Error("Enter Strong Password");
  }
};

module.exports ={validateSignUpData};
