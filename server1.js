const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const randomPort = require('random-port');

const app = express();
const PORT = 3005;
app.use(bodyParser.json({limit: '1gb'}));

// Middleware for handling file uploads using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('projectFolder'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file was uploaded.');
    }

    const uploadedFile = req.file;
    const projectDir = path.join(__dirname, 'uploads', uploadedFile.originalname);

    // Save the uploaded zip file
    fs.writeFileSync(projectDir, uploadedFile.buffer);

    // Unzip the project
    await exec(`unzip ${projectDir} -d ${projectDir.replace('.zip', '')}`);
   /*  if (fs.existsSync(projectDir)) {
      // Remove the existing symbolic link
      fs.unlinkSync(projectDir);

      console.log(`Existing symbolic link removed: ${projectDir}`);
  } */
    /*  const { mainFile, nodeVersion } = req.body;


    console.log(mainFile, nodeVersion, 'BODY')
    // Use NVM to switch to the specified Node.js version
    await exec(`nvm use ${nodeVersion}`);

    // Install project dependencies
    console.log('INSTALLING!')
    await exec(`cd ${projectDir} && npm install`);

    // Generate a random port number for the project
   const projectPort = await randomPort();

    // Create .env file with PORT environment variable
    const envFilePath = path.join(projectPath, '.env');
    fs.writeFileSync(envFilePath, `PORT=${projectPort}`);

    // Run the project using PM2
    const pm2ProcessName = `myApp_${Date.now()}`;
    await exec(`pm2 start ${mainFile} --name ${pm2ProcessName} --env ${envFilePath}`);

    // Configure Nginx
    const nginxConfig = `
      server {
        listen 80;
        server_name ${pm2ProcessName}.bugtech.solutions;

        location / {
          proxy_pass http://localhost:${projectPort};
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }
      }
    `; */

    // const nginxConfigPath = path.join('/etc/nginx/sites-available', `${pm2ProcessName}.conf`);
    // fs.writeFileSync(nginxConfigPath, nginxConfig);

    // // Create a symbolic link to enable the site
    // await exec(`ln -s ${nginxConfigPath} /etc/nginx/sites-enabled/`);

    // // Restart Nginx to apply changes
    // await exec('service nginx restart');
    res.json({message: 'Deployment successful!', projectDir: projectDir.replace('.zip', '')});
  } catch (err) {
    console.error(err); 
    res.status(500).send('Internal Server Error');
  }
});

app.post('/install', async (req, res) => {
    try {
        console.log(req.body)

       const { projectFolder } = req.body;
  
     
      await exec(`cd ${projectFolder} && npm install`);
  
      res.send('Deployment successful!');
    } catch (err) {
      console.error(err); 
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/run', async (req, res) => {
    try {
        console.log(req.body)

       const { projectFolder, startScript } = req.body;
        let scrpt = startScript ? startScript : 'start';
     
      await exec(`cd ${projectFolder} && pm2 start npm --name testApi -- run ${scrpt}`);
  
      res.send('Deployment successful!');
    } catch (err) {
      console.error(err); 
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
