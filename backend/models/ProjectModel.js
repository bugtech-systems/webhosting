// server/models/FileModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDomain: String,
    serviceType: {
        type: String,
        enum: ['react','nodejs', 'wordpress']
    },
    configs: [{
       configType: {
            type: String,
            enum: ['buildPath','nodeVersion','startScript']
       },
       value: String
       
    }],
    deployments: [{
        deployedAt: Date,
        projectPath: String,
        folderName: String,
        isLive: {
            type: Boolean,
            default: false
        },
        version: {
            type: Number,
            default: 1
        }
    }],
    host: {
        type: String
    },
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
