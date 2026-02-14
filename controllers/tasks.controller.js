// const Tasks = require("../models/tasks");
const tasksService = require("../services/task.service");
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


const getTaskById = async (req, res) => {
    
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    const task = await tasksService.getTaskById(
      taskId,
      userId,
      role);

    return res.status(200).json(task);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const projectId = req.params.projectId;

    const task = await tasksService.createTask(
      userId,
      role,
      projectId,
      req.body
    
    );

    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


const updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const taskId = req.params.id;
    const status = req.body.status;

    const updated = await tasksService.updateStatus(
      taskId,
      userId,
      role,
      status
    );

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updatePriorityStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const taskId = req.params.id;
    const priority = req.body.priority;

    const updated = await tasksService.updatePriority(
      taskId,
      userId,
      role,
      priority
    );

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
  const deleted = await tasksService.deleteTask(taskId);
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  getUserTasks,
  createTask,
  updateTaskStatus,
  getTaskById,
  deleteTask,
  updatePriorityStatus
};