// server/server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', true);

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json({limit: '1gb'}));
app.use(cors({ origin: '*' }));

mongoose.connect(process.env.PRIMARY_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      // console.log(color.green('Connected to MongoDB'));
    })
    .catch((error) => {
      // console.error(color.red('Error connecting to MongoDB:'), error.message);
    });
  
  
    const authRoutes = require('./routes/authRoutes');
    const fileRoutes = require('./routes/fileRoutes');
    const deploymentRoutes = require('./routes/deploymentRoutes');
    const userRoutes = require('./routes/userRoutes');  
    const { executeScript } = require('./utils/pgsqlHelper');


app.get('/', (req, res) => {
    res.send('TESTING API!')
})

// Create a route to trigger the script execution
app.get('/create-user-database', (req, res) => {
  executeScript();
  res.send('Script execution initiated');
});


app.use('/apiv2/auth', authRoutes);
app.use('/apiv2/file', fileRoutes);
app.use('/apiv2/deployment', deploymentRoutes);
app.use('/apiv2/user', userRoutes);

app.listen(port, () => {
console.log(`RUNNING ON PORT ${port}`)
    // console.log(color.blue(`Server is running on port ${color.bold.bgWhite(port)}`));
});
