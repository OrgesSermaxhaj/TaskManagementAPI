const Tasks = require("../models/tasks");
const ProjectMembers = require("../models/projectMembers");
const Projects = require("../models/projects");


const getAll = async ()=>{
    const tasks = await Tasks.find().populate('createdBy', 'fullName email role').populate('assignedTo' , 'fullName email role')
    return tasks;
}

const getUserTasks = async (userId)=>{
   const userTasks =  await Tasks.find({ assignedTo: userId }).populate('createdBy', 'fullName email role').populate('assignedTo', 'fullName email role')
    return userTasks;
}
const createTask = async (userId, role, projectId, data) => {
   const doesProjectExist = await Projects.findById(projectId);
  if (!doesProjectExist) {
    throw new Error("Project not found");
  }
  if (role !== "admin") {
    const isMember = await ProjectMembers.findOne({project: projectId, user: userId,});  

     if (!isMember) {
      throw new Error("You are not a member of this project");
    }
  }
  const {assignedTo} = data;

  const assignedToRole = role === "admin" && assignedTo ? assignedTo : userId;
  
   if (role === "admin" && assignedToRole) {
    const memberExists = await ProjectMembers.findOne({project: projectId, user: assignedToRole,});

    if (!memberExists) {
      await ProjectMembers.create({
        project: projectId,
        user: assignedToRole,  
      });
    }
  }
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


const updatePriority = async (taskId, userId, role, newPriority) => {

  const task = await Tasks.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  if (role !== "admin" && task.assignedTo.toString() !== userId) {
    throw new Error("You are not allowed to update this task's priority");
  }
  task.priority = newPriority;
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
const deleteTask = async (taskId) => {
  const deleted = await Tasks.findByIdAndDelete(taskId);
  if (!deleted) {
    throw new Error("Task not found");
  }
  return deleted;
};

module.exports = {
  getAll,
  getUserTasks,
  createTask,
  updateStatus,
  getTaskById,
  deleteTask, 
  updatePriority
};

























