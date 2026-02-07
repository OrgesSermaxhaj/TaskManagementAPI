const express = require('express');
const route = express.Router();
const userController = require("../controllers/user.controller");
const { reconstructFieldPath } = require('express-validator/lib/field-selection');
const { auth } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { admin } = require("../middleware/admin");

route.post('/register', validateRegister, userController.register);
route.post('/login', validateLogin, userController.login);
route.get('/currentUser',auth, userController.getCurrentUser);
module.exports = route;