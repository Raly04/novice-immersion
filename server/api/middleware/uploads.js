const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder with the publication_id as its name
    const publicationId = req.body.publication_id;
    const uploadDir = path.join(__dirname,"..","uploads", publicationId);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir , {recursive : true});
    }
    cb(null, `uploads/${publicationId}/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload
