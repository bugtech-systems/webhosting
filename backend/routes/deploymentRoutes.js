// server/routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
// const upload = require('../middleware/upload');

const authenticateToken = require('../middleware/authenticateToken');
const DeploymentController = require('../controllers/DeployController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/verify', 
authenticateToken, DeploymentController.checkAvailability);


router.post('/upload', 
authenticateToken, 
upload.single('projectFolder'), DeploymentController.uploadFile);

router.post('/install', 
authenticateToken, DeploymentController.install);

router.post('/run', 
authenticateToken, DeploymentController.runProject);


module.exports = router;
