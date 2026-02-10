const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller')
const {auth} = require('../middleware/auth')
const { admin } = require("../middleware/admin");


router.post('/create',auth, profileController.createProfile);
router.get('/me', auth, profileController.getCurrentProfile);

module.exports = router;