import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import fs from 'fs'
import multer from 'multer';

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});
// send image to cloudinary
export const sendImageToCloudinary = (imageName: string, path: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (result) {
          resolve(result);
        }
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });