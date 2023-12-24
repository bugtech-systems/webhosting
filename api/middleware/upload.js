require('dotenv').config();
const multer = require('multer');
const path = require('path');


const STATIC_PATH = process.env.STATIC_PATH
console.log(process.cwd(), 'cwd')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"))
  },
  filename: function (req, file, cb) {
    let newFileName = String(Date.now() + '-' + file.originalname).replace(/\s/g, '');


    cb(null, newFileName)
  }
})


const upload = multer({ storage: storage });
module.exports = upload