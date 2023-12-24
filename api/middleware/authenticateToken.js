// server/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split("Bearer ")[1];
    } else {
        return res.status(403).json({ text: "Unauthorized", type: "error" });
    }

    if (!token) {
        return res.status(403).json({
            text: "No token provided!",
            type: "error",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(403).json({ message: 'Invalid token, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
