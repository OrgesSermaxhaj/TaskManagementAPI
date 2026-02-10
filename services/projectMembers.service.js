const ProjectMembers = require("../models/projectMembers");
const Projects = require("../models/projects");

const addMember = async (projectId, userId) => {
 
  const project = await Projects.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }


  const exists = await ProjectMembers.findOne({ project: projectId, user: userId });
  if (exists) {
    throw new Error("User is already a member of this project");
  }

  const member = await ProjectMembers.create({
    project: projectId,
    user: userId,
  });

  return member;
};

const removeMember = async (projectId, userId) => {
   const project = await Projects.findById(projectId);
  if (project.createdFrom.toString() === userId) {
    throw new Error("You cannot remove the project creator from members");
  }

  const deleted = await ProjectMembers.findOneAndDelete({
    project: projectId,
    user: userId,
  });

  if (!deleted) {
    throw new Error("Member not found");
  }

  return deleted;
};

const getProjectMembers = async (projectId) => {
  const members = await ProjectMembers.find({ project: projectId }).populate("user", "fullName email role").select("user project");

  return members;
};

module.exports = {
  addMember,
  removeMember,
  getProjectMembers,
};
