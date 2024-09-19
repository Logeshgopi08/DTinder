const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://Logesh:7jb2DunzD5AlVZzt@logesh.jolaj.mongodb.net/devTinder");
}

module.exports = connectDb;