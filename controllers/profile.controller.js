const User = require("../models/User");
const profileService = require('../services/profile.service');
const userService = require("../services/user.service");
const createProfile = async (req,res)=>{
    const token = req.header('x-auth-header');
try{
const user = await userService.findCurrentUser(token);
console.log("User in createProfile:", user);
const profile = await profileService.create(user.id, req.body);
res.status(200).json(profile);
}
catch(err){
    res.status(400).json({msg:err});
}

}


const getCurrentProfile = async (req,res)=>{
    const token = req.header('x-auth-header');
    try{
    const user = await userService.findCurrentUser(token);
    const profile = await profileService.findCurrentProfile(user.id);
    res.status(200).json({profile});
    }catch(err){
        res.status(400).json({msg: err});
    }
}

module.exports={
    createProfile, getCurrentProfile
}