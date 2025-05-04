const express = require("express");
const multer = require("multer");
const router = express.Router();
const { checkFileIntegrity } = require("../controllers/fileIntegrityController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/check-file-integrity", upload.single("file"), checkFileIntegrity);

module.exports = router;