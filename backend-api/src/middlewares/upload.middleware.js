import multer from "multer";
import path from "path";

// Set up storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads"); // Specify your desired upload directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid overwriting files
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Configure the upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const isAllowedMimeType = allowedTypes.test(file.mimetype);
    const isAllowedExtName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (isAllowedMimeType && isAllowedExtName) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!")); // Error for unsupported files
    }
  },
});

export default upload;
