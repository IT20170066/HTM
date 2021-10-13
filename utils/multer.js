const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (!path) {
      return res.status(200).json({
        code: 400,
        success: false,
        status: "Bad Request",
        message: "Image must be upload.",
      });
    }

    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("File type is not supported."), false);
      return;
    }
    cb(null, true);
  },
});
