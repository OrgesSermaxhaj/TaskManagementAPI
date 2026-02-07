const userService = require("../services/user.service");

const register = (async (req,res)=>{
try{
const {fullName, email, password, age, avatar} = req.body;
const user = await userService.register(fullName, email, password,age, avatar );
res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: "Could not register"})
    }
})

const login = async (req, res)=>{
    try{
    const {email, password} = req.body;
    const userExists = await userService.findUser(email);
    if(!userExists){
        return res.status(404).json({message: "User does not exist"});
    }
    const user = await userService.login(email, password);
    // console.log(user);
    if(user){
    res.status(200).json(user);
    }
    else{
        res.status(404).json({message: "Invalid credentials"});
    }
   }
    catch(err){
        res.status(404).json(err);
    }
}



const getCurrentUser = async(req,res)=>{
      const token = req.header('x-auth-header');
      try{
    
 const currentUser = await userService.findCurrentUser(token);
    res.status(200).json(currentUser);
    }
    catch(err){
        res.status(500).json({message: "Could not fetch current user"});
    }
}
module.exports = {
    register, login, getCurrentUser
}