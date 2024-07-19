const errorWrapper = require("../utils/errorWrapper");
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const uploadDir = path.join(__dirname, '../uploads');
console.log(uploadDir);
// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

exports.fileUpload = errorWrapper(async (req,res,next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }
        const uploadedFile = files.file[0];
        res.status(200).json({
            message: 'File uploaded successfully',
            file: {
                new_name: uploadedFile.newFilename,
                path: uploadedFile.filepath,
                size: uploadedFile.size
            }
        });
    });
});