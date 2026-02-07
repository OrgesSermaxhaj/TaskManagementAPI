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
const createTask = async (userId, role, projectId, data) => {
  const {assignedTo} = data;

  const assignedToRole = role === "admin" && assignedTo ? assignedTo : userId;
  const task = new Tasks({
    ...data,
    project: projectId, 
    createdBy: userId,
    assignedTo: assignedToRole,
  });

  await task.save();
  return task;
};

const updateStatus = async (taskId, userId, role, newStatus) => {

  const task = await Tasks.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  if (role !== "admin" && task.assignedTo.toString() !== userId) {
    throw new Error("You are not allowed to update this task");
  }
  task.status = newStatus;
  await task.save();

  return task;
};
const getTaskById = async (taskId, userId, role) => {

  const task = await Tasks.findById(taskId).populate("createdBy", "fullName email role").populate("assignedTo", "fullName email role");
  if (!task) {
    throw new Error("Task not found");
  }
  const assignedToId = task.assignedTo?._id ? task.assignedTo._id.toString() : task.assignedTo?.toString();
  if (role !== "admin" && assignedToId!== userId) {
    throw new Error("You are not allowed to view this task");
  }

  return task;
};

module.exports = {
  getAll,
  getUserTasks,
  createTask,
  updateStatus,
  getTaskById
};

























