const userService = require('./user.service');
const Tasks = require("../models/tasks");



const getAll = async ()=>{
    const tasks = await Tasks.find().populate('createdBy', 'fullName email role').populate('assignedTo' , 'fullName email role')
  
    return tasks;
}

const getUserTasks = async (userId)=>{
   const userTasks =  await Tasks.find({ assignedTo: userId }).populate('createdBy', 'fullName email role').populate('assignedTo', 'fullName email role')
   
    return userTasks;
}


























module.exports = {
    getAll, getUserTasks
};