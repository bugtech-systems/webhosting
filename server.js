// server/server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/authRoutes');
const fileRoutes = require('./api/routes/fileRoutes');
const deploymentRoutes = require('./api/routes/deploymentRoutes');
const userRoutes = require('./api/routes/userRoutes');


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
console.log(process.env.PRIMARY_STRING, 'MONGO')
mongoose.connect(process.env.PRIMARY_STRING,  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json({limit: '1gb'}));

app.get('/', (req, res) => {
    res.send('TESTING API!')
})

app.use('/apiv2/auth', authRoutes);
app.use('/apiv2/file', fileRoutes);
app.use('/apiv2/deployment', deploymentRoutes);
app.use('/apiv2/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
