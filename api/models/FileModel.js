// server/models/FileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    host: {
        type: String,
        default: 'bugtech.solutions'
    },
    subdomain: String,
    ssl: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;
