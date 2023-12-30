require('dotenv').config();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"))
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    let newFileName = String(Date.now() + '-' + file.originalname).replace(/\s/g, '');
  console.log(newFileName)

    cb(null, newFileName)
  }
})


const upload = multer({ storage: storage });
module.exports = upload