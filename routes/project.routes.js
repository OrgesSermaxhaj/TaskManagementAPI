const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { validateProject } = require("../middleware/validators");

router.post("/", auth, admin, validateProject, projectController.createProject);
router.get("/adminAll", auth, admin, projectController.getAllProjectsAdmin);
router.get("/myProjects", auth, projectController.getMyProjects);
router.get("/:id", auth, projectController.getProjectById);

module.exports = router;