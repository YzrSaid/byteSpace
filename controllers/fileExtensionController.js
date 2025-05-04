const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

exports.checkFileIntegrity = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalExtension = path.extname(req.file.originalname).toLowerCase().replace('.', ''); 
    const expectedMimeType = getMimeTypeFromExtension(originalExtension); 

    console.log("Original Extension:", originalExtension); 
    console.log("Expected MIME type:", expectedMimeType); 

    try {
        const fileBuffer = fs.readFileSync(filePath); 
        const fileTypeResult = await fileType.fromBuffer(fileBuffer); 

        fs.unlinkSync(filePath); 

        if (!fileTypeResult) {
            return res.status(400).json({ success: false, message: 'Unable to determine file type' });
        }

        const actualExtension = fileTypeResult.ext.toLowerCase(); 
        const actualMimeType = fileTypeResult.mime; 
        console.log("Actual Extension (from file type detection):", actualExtension); 
        console.log("Actual MIME type (from file type detection):", actualMimeType); 

        // Check if content matches the expected file type (i.e., the original extension)
        const isExtensionValid = actualExtension === originalExtension;
        const isMimeValid = actualMimeType === expectedMimeType;

        // If both checks fail, it's an invalid file
        if (!isExtensionValid || !isMimeValid) {
            return res.status(400).json({
                success: false,
                message: 'File extension or MIME type is invalid',
                originalExtension,
                actualExtension,
                expectedMimeType,
                actualMimeType
            });
        }

        // If both checks pass, the file is valid
        return res.json({
            success: true,
            message: 'File extension is valid',
            originalExtension,
            actualExtension,
            originalMimeType: expectedMimeType,
            actualMimeType
        });

    } catch (err) {
        console.error("Error processing file:", err); 
        return res.status(500).json({ success: false, message: 'Error processing file' });
    }
};

// Helper function to get MIME type from file extension
function getMimeTypeFromExtension(extension) {
    const mimeTypes = {
        'pdf': 'application/pdf',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
    };
    
    return mimeTypes[extension] || ''; 
}
