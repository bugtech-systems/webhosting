// server/controllers/FileController.js
const fs = require('fs');
const path = require('path');
const File = require('../models/FileModel');
const axios = require('axios');
const cheerio = require('cheerio');
const { exec } = require('child_process');

const { getFiles } = require('../utils/helpers');
// Multer setup for file upload
const{fileURLToPath} = require('url');


module.exports = {
    uploadFile: async (req, res) => {
        let { projectName } = req.query;
        try {
            if (!req.file) {
                return res.status(400).send('No file was uploaded.');
              }
          
              const uploadedFile = req.file;
              const projectDir = path.join(process.cwd(), 'uploads', uploadedFile.originalname);
            console.log(projectDir, process.cwd(), uploadedFile.originalname, req.file)
              // Save the uploaded zip file
              fs.writeFileSync(projectDir, uploadedFile.buffer);
          
              // Unzip the project
             /*  await exec(`unzip ${projectDir} -d ${projectDir.replace('.zip', '')}`, async (error, stdout, stderr) => {
                if (error) {
                  console.log(`Error: ${error.message}`);
                  return;
                }
                
                if (stderr) {
                  console.log(`Stdout: ${stderr}`);
                //   setResult(`Error: ${stderr}`);
                  return;
                }
          
    
                
              }); */
                
              const file = new File({ projectName, filename: req.file.filename, path: req.file.path, user: req.user?._id });
              await file.save();
              res.json({message: 'Deployment successful!', projectDir: projectDir.replace('.zip', '')});

       
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },
    install: async (req, res) => {
        
        try {
        
        const { startScript,projectFolder,  nodeVersion } = req.body;
    console.log(req.body)
              await exec(`nvm use ${nodeVersion}`, (error, stdout, stderr) => {
              console.log(error, stdout, stderr, 'STDD')
                if (error) {
                    console.log(`Error: ${error.message}`);
                    return res.status(400).json({message: 'Installment successful!'});
                  }
                  
                  if (stdout) {
                    console.log(`Stdout: ${stdout}`);
                    exec(`cd ${projectFolder} && npm install`, (error1, stdout1, stderr1) => {
                        console.log(error1, stdout1, stderr1, 'STDD NPM')
                        if (error) {
                            console.log(`Error: ${error.message}`);
                            return res.status(400).json({message: 'Installment successful!'});
                          }
                        return res.json({message: 'Installment successful!'});

                    });
                  //   setResult(`Error: ${stderr}`);
                  }
                    
              });

      
            //   res.json({message: 'Installment successful!'});

       
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },
    runProject: async (req, res) => {
            try {
            
        const { projectFolder, startScript } = req.body;
        let scrpt = startScript ? startScript : 'start';
    exec(`pm2 delete testApi`,  (error1, stdout1, stderr1) => {
        console.log(error1, stdout1, stderr1, 'pm2 delete  ')
     
      exec(`cd ${projectFolder}  && pm2 start server.js -xn 'testapi'`, (error, stdout, stderr) => {
        console.log(error, stdout, stderr, 'STDD')
        if (error) {
            // console.log(`Error: ${error.message}`);
            return res.status(400).json({message: `Run Error: ${stderr}`});
          }
        if (!error) {
            console.log(`Stdout: ${stdout}`);
            res.send('Deployment successful!');
            
        }
    })
      
      });
         
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
    
    }
};
