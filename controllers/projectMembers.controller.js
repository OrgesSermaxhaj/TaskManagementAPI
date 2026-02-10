const projectMembersService = require("../services/projectMembers.service");

const addMember = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const {userId} = req.body;
    const memberi = await projectMembersService.addMember(projectId, userId);
    return res.status(201).json(memberi);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.params.userId;

    const deleted = await projectMembersService.removeMember(projectId, userId);
    return res.status(200).json({message: "Project member has been deleted!"});
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProjectMembers = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const members = await projectMembersService.getProjectMembers(projectId);

    if (members.length === 0) {
      return res.status(200).json({ message: "Project has no members!" });
    }

    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch project members" });
  }
};

module.exports = {
  addMember,
  removeMember,
  getProjectMembers,
};