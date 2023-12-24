// server/routes/fileRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/upload');
const FileController = require('../controllers/FileController');



router.post('/upload', authenticateToken, upload.single('file'), FileController.uploadFile);
router.post('/verify', FileController.checkAvailability);
router.post('/ssl', FileController.secureSsl);
router.put('/delete', authenticateToken, FileController.deleteSite)
router.get('/url', FileController.getUrlMetadata);
router.get('/files', authenticateToken, FileController.getFiles);


module.exports = router;
