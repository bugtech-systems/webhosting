// server/controllers/FileController.js
const fs = require('fs');
const path = require('path');
const File = require('../models/FileModel');
const Project = require('../models/ProjectModel');
const { v4: uuidv4 } = require('uuid');

const { exec } = require('child_process');
let storagePath = process.env.STORAGE_PATH + '/storageFolder';
module.exports = {
    checkAvailability: async (req, res) => {
        let { projectName, projectId } = req.body;
        try {
            if (!projectName) {
                return res.status(404).json({ error: 'Project Name is required!' })
            }

            let available = await Project.findOne({ $and: [{ projectDomain: projectId}, {isDeleted: false}] })


            res.status(200).json({ availability: available ? false : true })

        } catch (error) {

            res.status(500).json({ error: 'Something went wrong!' });
        }
    },
    uploadFile: async (req, res) => {
        let { projectName } = req.query;
        try {
            if (!req.file) {
                return res.status(400).send('No file was uploaded.');
              }
          
              const uploadedFile = req.file;
              const projectDir = path.join(storagePath, uuidv4());
              // Save the uploaded zip file
              fs.writeFileSync(`${projectDir}.zip`, uploadedFile.buffer);
          
              // Unzip the project
              await exec(`unzip ${projectDir}.zip -d ${projectDir}`, async (error, stdout, stderr) => {
                if (error) {
                  console.log(`Error: ${error.message}`);
                  return;
                }
                
                if (stderr) {
                  console.log(`Stdout: ${stderr}`);
                //   setResult(`Error: ${stderr}`);
                  return;
                }
          
    
                
              }); 
                
              const file = new File({ projectName, filename: req.file.filename, path: req.file.path, user: req.user?._id });
              await file.save();
              res.json({message: 'Deployment successful!', projectDir: projectDir});

       
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },
    install: async (req, res) => {
        
        try {
        
        const { startScript,projectFolder,  nodeVersion } = req.body;
    console.log(req.body)
             exec(`nvm use ${nodeVersion}`, (error, stdout, stderr) => {
                    
        }); 
        
        exec(`cd ${projectFolder} && npm install`, (error1, stdout1, stderr1) => {
          console.log(error1, stdout1, stderr1, 'STDD NPM')
          if (error1) {
              console.log(`Error: ${error1.message}`);
              return res.status(400).json({message: 'Installment successful!'});
            }
          return res.json({message: 'Installment successful!'});

      })
              // res.json({message: 'Installment successful!'});

       
            
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
