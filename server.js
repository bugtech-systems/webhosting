// server/server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/authRoutes');
const fileRoutes = require('./api/routes/fileRoutes');
const userRoutes = require('./api/routes/userRoutes');


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/file-upload-app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/file', fileRoutes);
app.use('/api/v2/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
