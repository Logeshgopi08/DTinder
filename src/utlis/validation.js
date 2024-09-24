const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter the First and Last Name properly ");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Enter Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password");
  }
};

const validateEditProfileData = (req) => {
 
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field)=>[
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
  ].includes(field));

  return isEditAllowed;
};

module.exports = { validateSignUpData ,validateEditProfileData};
