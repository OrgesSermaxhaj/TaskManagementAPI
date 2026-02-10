const projectService = require("../services/project.service");

const createProject = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { Name, Description } = req.body;

    const project = await projectService.createProject(userId, Name, Description);
    return res.status(201).json(project);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    if (projects.length === 0) {
      return res.status(200).json({ message: "There are no projects!" });
    }
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch projects" });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await projectService.getMyProjects(userId);
    if (projects.length === 0) {
      return res.status(200).json({ message: "User has no projects!" });
    }

       return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch your projects" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    const project = await projectService.getProjectById(projectId, userId, role);
    return res.status(200).json(project);
  } 
  catch (err) {
    return res.status(403).json({ message: err.message });
  }
};
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deleted = await projectService.deleteProject(projectId);
    return res.status(200).json({message: "Project has been deleted!"});
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjectsAdmin,
  getMyProjects,
  getProjectById,
  deleteProject
};