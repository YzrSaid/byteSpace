const crypto = require("crypto");

exports.checkFileIntegrity = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        const fileBuffer = req.file.buffer; 
        const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

        return res.json({
            success: true,
            hash,
            originalName: req.file.originalName,
        });
    } catch (error) {
        console.error("Hashing error:", error);
        return res.status(500).json({ success: false, message: "Error processing file." });
    }
};