const Projects = require("../models/projects");
const ProjectMembers = require("../models/projectMembers");

const createProject = async (userId, Name, Description) => {
  const project = await Projects.create({
    Name,
    Description,
    createdFrom: userId,
  });
  await ProjectMembers.create({
    project: project._id,
    user: userId,
  });

  return project;
};

const getAllProjects = async () => {
  return await Projects.find().populate("createdFrom", "fullName email role");
};

const getMyProjects = async (userId) => {
  const memberships = await ProjectMembers.find({ user: userId }).select("project");
  const projectIds = memberships.map(m => m.project);

  const projects = await Projects.find({ _id: { $in: projectIds } }).populate("createdFrom", "fullName email role");
  return projects;

};

const getProjectById = async (projectId, userId, role) => {
  if (role !== "admin") {
    const isMember = await ProjectMembers.findOne({project: projectId, user: userId,});
    if (!isMember) {
      throw new Error("You are not allowed to view this project");
    }
  }

  const project = await Projects.findById(projectId).populate("createdFrom", "fullName email role");
  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

module.exports = {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
};