const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller')
const {auth} = require('../middleware/auth')
const { admin } = require("../middleware/admin");
const {validateTask} = require('../middleware/validators');

router.get('/adminAll',auth, admin, tasksController.getAllTasks);
router.get('/userTasks',auth, tasksController.getUserTasks);

module.exports = router;