// server/routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
// const upload = require('../middleware/upload');

const authenticateToken = require('../middleware/authenticateToken');
const FileController = require('../controllers/DeployController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload', 
authenticateToken, 
upload.single('projectFolder'), FileController.uploadFile);

router.post('/install', 
authenticateToken, FileController.install);

router.post('/run', 
authenticateToken, FileController.runProject);


module.exports = router;
