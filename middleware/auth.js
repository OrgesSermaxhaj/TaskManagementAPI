const jwt = require('jsonwebtoken');

const auth = (req,res, next)=>{
    const token = req.header('x-auth-header');
    if(!token){
        res.status(401).json({msg:"No token provided"});
    }
    try{
        console.log("Token:", token);
    const decoded = jwt.verify(token, 'secret');
    // console.log("Decoded:", decoded);
    req.user = decoded;
    next();
}
    catch(err){
        res.status(500).json({msg: "Token is invalid"});
    }
} 

module.exports = {
    auth
}