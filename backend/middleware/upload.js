require('dotenv').config();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storagePath = process.env.STORAGE_PATH + '/storageFolder';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath)
  },
  filename: function (req, file, cb) {
    let newFileName = uuidv4();
    cb(null, newFileName)
  }
})


const upload = multer({ storage: storage });
module.exports = upload