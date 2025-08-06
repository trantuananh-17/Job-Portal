import { Request } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fieldSize: 1 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const fileTypes = ['image/jepg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (fileTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error('Định dạng file k hợp lệ'));
  }
});

export default upload;
