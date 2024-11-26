import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif/;
  const videoTypes = /mp4|avi|mov/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype.toLowerCase();

  if (imageTypes.test(extname) && imageTypes.test(mimetype)) {
    cb(null, true); // Chấp nhận file ảnh
  } else if (videoTypes.test(extname) && videoTypes.test(mimetype)) {
    cb(null, true); 
  } else {
    cb('Error: Only images and videos are allowed!'); 
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 40 * 1024 * 1024 }, 
  fileFilter: fileFilter
});

export default upload;
