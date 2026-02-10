 const userService = require('./user.service');
 const Profile = require('../models/profile');
const create = async (userId, profile)=>{
    const user = userService.findUser(userId);
if(!user){
   throw new Error("User not found!");
}
try{
 const newProfile = new Profile({
    user: userId,
        ...profile
        
 });

 await newProfile.save();
 return newProfile;}
 catch(err){
    throw new Error("Could not save profile!");
 }
}

const findCurrentProfile = async (userId)=>{
    const profile = await Profile.findOne({user: userId});
    if(!profile){
        throw new Error("User not found!");
    }
    return profile;

}

module.exports = {
    create, findCurrentProfile
}