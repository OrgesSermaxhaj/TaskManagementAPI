const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller')
const {auth} = require('../middleware/auth')
const { admin } = require("../middleware/admin");
const {validateTask} = require('../middleware/validators');

router.get('/adminAll',auth, admin, tasksController.getAllTasks);
router.get('/userTasks',auth, tasksController.getUserTasks);
router.post('/project/:projectId', auth, validateTask, tasksController.createTask);
router.patch('/:id/status', auth, tasksController.updateTaskStatus);
router.patch('/:id/priority', auth, tasksController.updatePriorityStatus);
router.get('/:id', auth, tasksController.getTaskById);
router.delete("/:id", auth, admin, tasksController.deleteTask);

module.exports = router;