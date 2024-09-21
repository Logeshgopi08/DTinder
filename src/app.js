const express = require("express");
const { AdminAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { Types } = require("mongoose");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //This is instance of the User Model
  const users = new User(req.body);

  try {
    await users.save();
    res.send("User created Successfully!!");
  } catch (error) {
    res.send("Something went Wrong" + error);
  }
});

app.get("/getAlldata", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (error) {
    res.send("Something went Wrong" + error);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailID;
  try {
    const userData = await User.findOne({ emailID: email });
    res.send(userData);
  } catch (error) {
    res.send("Something went Wrong" + error.message);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const email = req.body.emailID;
  try {
    const deleteData = await User.deleteOne({ emailID: email });
    res.send("User Deleted Successfully");
  } catch (error) {
    res.send("Something went Wrong" + error);
  }
});

app.patch("/updateUser/:userid", async (req, res) => {
  const id = req.params?.userid;
  const data = req.body;

  try {
    const ALLOWEDUPDATES = ["gender", "age", "skills"];

    const isUpdated = Object.keys(data).every((k) =>
      ALLOWEDUPDATES.includes(k)
    );

    if(!isUpdated){
        throw new Error("something went wrong");
    }

    // if(!data.skills.length<10){
    //     throw new Error("Select Only Enter");
    // }

    const updateUser = await User.findByIdAndUpdate({ _id: id }, data, {
      runValidators: true,
    });
    res.send("User Updated Succesfully!!");
  } catch (error) {
    res.send("Something went Wrong" + error.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database is connected");

    app.listen(3500, () => {
      console.log("Server is listening on 3500.. ");
    });
  })
  .catch((err) => {
    console.log("Database is Not connected");
    console.log(err);
  });
