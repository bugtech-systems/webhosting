  import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from './PaymentForm';
import Review from './Review';
import FileUpload from './FileUpload';
import Header from 'pages/Header';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CREATE, CLEAR_PROJECT_NAME, SET_MOBILE_OPEN, SET_PROJECTS } from 'redux/actions/types';
import ReactConfig from './ReactConfig';
import { useNavigate, useParams } from 'react-router-dom';
import FileUploadService from 'utils/FileUploadService';



const steps = ['Project Files', 
'Project Configurations', 
'Review Details'];



export default function Setup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { setupType } = useParams();
  const {  projectName } = useSelector(({data}) => data);
  const { mobileOpen } = useSelector(({ui}) => ui);
  const [activeStep, setActiveStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0)
  const [selectedFiles, setSelectedFiles] = React.useState(undefined);
  const [currentFile, setCurrentFile] = React.useState(undefined);
  const [message, setMessage] = React.useState(null)

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FileUpload handleGetFiles={handleGetFiles} uploadFile={uploadFile} progress={progress} currentFile={currentFile} />;
      case 1:
         return setupType === 'react' ? <ReactConfig /> : <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  
  const handleGetFiles = () => {
    FileUploadService.getFiles()
      .then(res => {
        dispatch({type: SET_PROJECTS, payload: res.data})
        // setSites(res.data)
      })
      .catch(err => {
      if(err?.response?.status === 403){
        localStorage.clear();   
        window.location.href = '/';
      }
      });
  }
  
  const uploadFile = (files) => {
    // e.preventDefault()
    if (files.length > 0) {
        setSelectedFiles(files);
    }
    let currentFile = files[0];

    setProgress(0);
    setCurrentFile(currentFile);
  }
  



  const handleNext = (e) => {
        e.preventDefault()

        FileUploadService.deploy(currentFile, projectName, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {

        //         // setMessage(response.data.message);
                return FileUploadService.upload(currentFile, projectName);
            })
            .then((response) => {
                setMessage(response.data.message);
                handleGetFiles()
                setSelectedFiles(undefined);
                dispatch({type: CLEAR_PROJECT_NAME});
                dispatch({type: CLEAR_CREATE})
                navigate('/dashboard');
            })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
                setSelectedFiles(undefined);
            });
      console.log(currentFile)
      console.log(selectedFiles)
    };
      // setActiveStep(activeStep + 1);

  const handleBack = () => {
    if(activeStep === 0){
      navigate(-1)    
    } else {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleDrawerToggle = () => {
    dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
  };
  

  return (
    <>
           <Header onDrawerToggle={handleDrawerToggle} />
      <CssBaseline />
      <Box component="main" sx={{ flex: 1, py: 1, px: 1, bgcolor: '#eaeff1' }}>
          <Container sx={{ pt: 3 }} maxWidth="md">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Typography component="h1" variant="h6" align="center">
          {setupType === 'react' ? "ReactJS Deployment" : setupType === 'express' ? "NodeJS/Express Deployment" : "Wordpress Deployment"}   
          </Typography> 
   
          {activeStep === steps.length - 1? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                You Successfully deployed {setupType === 'react' ? "ReactJS" : setupType === "express" ? "NodeJS/Express" : "WordPress"} Project.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                  variant="contained"
                  onClick={() => { 
                    
                    // newProjects.push({_id: Math.random(), projectName: projectName, url: 'https://jaybee.bugtech.solutions'})
                    dispatch({type: CLEAR_PROJECT_NAME})
                    dispatch({type: CLEAR_CREATE})
                    navigate('/dashboard')
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  View Projects
                </Button>
                </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
               Deploy
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
      </Box>

    </>
  );
}