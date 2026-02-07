const Tasks = require("../models/tasks");
const tasksService = require("../services/task.service");
// const profileService = require('../services/profile.service');
// const userService = require("../services/user.service");


const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
     if (tasks.length === 0) {
      return res.status(200).json({message: "There are no tasks!"});
     }
      return res.status(200).json(tasks);
      
  }  catch (err) {
       return res.status(500).json({ message: 'Could not fetch tasks' });
  }  
};

const getUserTasks = async(req, res) => {
    try{ 
    const userId = req.user.id;
        console.log("this is the users id", userId);
      const tasks = await tasksService.getUserTasks(userId);
       if (tasks.length === 0) {
      return res.status(200).json({message: "User has no tasks!"});
          }
    return res.status(200).json(tasks);
  } 
  catch (err) {
     res.status(500).json({ message: 'Could not fetch your tasks' });
    }
};

module.exports = {
  getAllTasks, getUserTasks
};