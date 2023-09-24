import multer from "multer";


// config multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/public/img");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    },
  });

  export const uploader = multer({storage});