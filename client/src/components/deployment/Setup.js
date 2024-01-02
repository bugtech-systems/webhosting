  import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import FileUpload from './FileUpload';
import Header from 'pages/Hosting/Header';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CREATE, CLEAR_PROJECT_NAME, SET_MOBILE_OPEN, SET_PROJECTS } from 'redux/actions/types';
import ReactConfig from './ReactConfig';
import { useNavigate, useParams } from 'react-router-dom';



const steps = ['Project Files', 'Project Configurations', 'Review Details'];



export default function Setup({handleGetFiles}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { setupType } = useParams();
  const { projects, projectName } = useSelector(({data}) => data);
  const { mobileOpen } = useSelector(({ui}) => ui);
  const [activeStep, setActiveStep] = React.useState(0);


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FileUpload handleGetFiles={handleGetFiles}/>;
      case 1:
        return setupType === 'react' ? <ReactConfig /> : <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  



  const handleNext = () => {
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const handleDrawerToggle = () => {
    dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
  };
  
console.log(setupType, 'Setup')


  return (
    <>
           <Header onDrawerToggle={handleDrawerToggle} />
      <CssBaseline />
      <Box component="main" sx={{ flex: 1, py: 1, px: 1, bgcolor: '#eaeff1' }}>
          <Container sx={{ pt: 3 }} maxWidth="md">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Typography component="h1" variant="h5" align="center">
          {setupType === 'react' ? "ReactJS Deployment" : setupType === 'express' ? "NodeJS/Express Deployment" : "Wordpress Deployment"}   
          </Typography> 
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length - 1? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                You Successfully deployed {setupType === 'react' ? "ReactJS" : setupType === "express" ? "NodeJS/Express" : "WordPress"} Project.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                  variant="contained"
                  onClick={() => { 
                    let newProjects = projects;
                    
                    newProjects.push({_id: Math.random(), projectName: projectName, url: 'https://jaybee.bugtech.solutions'})
                    dispatch({type: SET_PROJECTS, payload: newProjects})
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
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Deploy' : 'Next'}
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