// server/controllers/AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { validateSignupData, validateLoginData } = require('../utils/validators');

module.exports = {
    signup: async (req, res) => {
        try {
            let { errors, valid } = validateSignupData(req.body);

            if (!valid) {
                return res.status(400).json({ message: 'Something went wrong!', errors: errors });
            }

            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: 'Something went wrong!', errors: { email: 'Email is already taken!' } });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);



            const newUser = new User({ email: req.body.email, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        let { errors, valid } = validateLoginData(req.body);

        if (!valid) {
            return res.status(400).json({ message: 'Something went wrong!', errors: errors });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ errors: { email: 'Email not found!' } });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ errors: { password: 'Invalid password' } });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header('Authorization', token).json({ token: token });
    },
};
