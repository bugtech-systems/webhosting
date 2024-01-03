// server/server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json({limit: '1gb'}));
app.use(cors({ origin: '*' }));

mongoose.connect(process.env.PRIMARY_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
  
  
    const authRoutes = require('./routes/authRoutes');
    const fileRoutes = require('./routes/fileRoutes');
    const deploymentRoutes = require('./routes/deploymentRoutes');
    const userRoutes = require('./routes/userRoutes');  


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
