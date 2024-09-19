const AdminAuth = (req,res,next)=>{
    console.log("Auth router is clicked");
    
    const token = "xyz";
    const isAuthorizedToken = token ==="xyz";
    if(!isAuthorizedToken){
        res.status(401).send("Unauthorised token are present");
    }
    else{
        next();
    }

}

module.exports ={AdminAuth};