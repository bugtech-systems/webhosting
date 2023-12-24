// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const UserController = require('../controllers/UserController');

router.get('/', authenticateToken, UserController.getAuthenticatedUser);



module.exports = router;
