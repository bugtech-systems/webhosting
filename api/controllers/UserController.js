// server/controllers/UserController.js
const User = require('../models/UserModel');

module.exports = {
    getAuthenticatedUser: (req, res) => {
        console.log(__dirname, 'dir name')
        res.json(req.user);
    }
};
