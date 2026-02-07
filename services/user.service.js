
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const generateToken = (userId, role)=>{
    const token = jwt.sign({id: userId, role: role}, 'secret', {expiresIn: '1d'});
    return token;
}
const register = async (fullName, email, password, age, avatar) =>{
    try{
    const userRegister = await User.findOne({email:email});
    if(userRegister){
        throw new Error("This user exists");
    }
    const hashed = await hashPassword(password)
    const newUser = new User({
        fullName: fullName,
        email: email,
        password: hashed,
        age: age,
        avatar: avatar,
    });
    await newUser.save();
    return newUser;
}
catch(err){
    return err;
}

}
const login = async(email, password)=>{
    const user = await findUser(email);
    if(user){
        const match = await bcrypt.compare(password, user.password)
        if(match){
            const token = generateToken(user._id, user.role);
            return {
                user: user,
                accessToken: token
            }
        }
    }
    else{
        return null;
    }
}

const findUser = async(email)=>{
    const user = User.findOne({email: email});
    return user;

}
const findCurrentUser = async(token)=>{
      const decoded = jwt.verify(token, 'secret');
     const userId = decoded.id;
    const userCurrent = await User.findOne({_id: userId}).select("-password");
    if(!userCurrent){
        throw new Error("User not found!");
    }
    return userCurrent;
}

const hashPassword = async(password) =>{
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt)

    return hashed;

}

module.exports = {
    register, findUser, login, findCurrentUser
}