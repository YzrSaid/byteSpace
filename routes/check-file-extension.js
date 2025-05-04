const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fileExtensionController = require('../controllers/fileExtensionController');

router.post('/check-file-extension', upload.single('file'), fileExtensionController.checkFileIntegrity);

module.exports = router;
