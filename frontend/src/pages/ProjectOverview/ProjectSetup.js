import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from 'components/MainFeaturedPost';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MOBILE_OPEN, SET_PROJECT_NAME } from 'redux/actions/types';
import Projects from './Projects';
import { verifyProjectName } from 'redux/actions/data.action';


const mainFeaturedPost = {
  title: 'Hosting Made Easy',
  description:
    "Easiest Way to Launch Your Website online: Drag, Drop, Done!",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

export default function ProjectSetup() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { projects } = useSelector(({data}) => data);
  const { mobileOpen, createNew } = useSelector(({ui}) => ui);
  const [project, setProjectName] = useState('');
  const [error, setError] = useState(null)
  
  const handleCreate = (e) => {
    e.preventDefault();
    
    dispatch(verifyProjectName({projectName: project}))
    .then(res => {
      let { availability } = res.data;
        if(availability){
          dispatch({type: SET_PROJECT_NAME, payload: project})
          navigate('/dashboard/service')
        } else {
          setError('Unavailable!')
        
        }
      
      console.log(res.data, 'RESP')
    })
    .catch(err => {
      console.log(err, 'ERRR')
    })
  
      

  }
  
  
  const handleDrawerToggle = () => {
    dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
  };
  
  
  return (
    <>
       <Header onDrawerToggle={handleDrawerToggle} hasProject={projects.length !== 0} />
          <Box component="main" sx={{ flex: 1, py: 1, px: 1, bgcolor: '#eaeff1' }}>
          {(projects.length === 0 || createNew) ? 
          <Container sx={{ pt: 3 }} maxWidth="md">
          <MainFeaturedPost post={mainFeaturedPost} />
          <TextField fullWidth variant='standard'
          label="Project Name"
          margin="normal"
          value={project}
          onChange={(e) => setProjectName(e.target.value)}
          error={error}
          helperText={error && error}
          />
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", mt: '50px'}}>
          <Button variant="contained"
            onClick={handleCreate}
          >
            CREATE
          </Button>
          </Box>
          </Container>
          :
          <Projects />
          }
  {/* <ProjectOverview/> */}
          </Box>
      
    </>
  )
}
