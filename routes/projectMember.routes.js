const express = require("express");
const router = express.Router();
const projectMembersController = require("../controllers/projectMembers.controller");
const {auth} = require("../middleware/auth");
const {admin} = require("../middleware/admin");
const {validateProjectMembers} = require("../middleware/validators");

router.post("/:projectId", auth, admin, validateProjectMembers, projectMembersController.addMember);
router.delete("/:projectId/:userId", auth, admin, projectMembersController.removeMember);
router.get("/:projectId", auth, admin, projectMembersController.getProjectMembers);

module.exports = router;