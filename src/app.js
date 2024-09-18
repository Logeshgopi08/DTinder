const express = require("express");

const app = express();


app.get("/",(req,res)=>{
     res.send("Hello "); 
});

app.get("/test",(req,res)=>{
      res.send("Test is Working");
});


app.listen(3500,()=>{
    console.log("Server is listening on 3500.. ");
    
})