const express = require("express");
const connectDb = require("./config/database");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieparser());




app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


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
