import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from 'components/MainFeaturedPost';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
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
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState(null)
  
  const handleCreate = (e) => {
    e.preventDefault();
    
    dispatch(verifyProjectName({projectName: project, projectId}))
    .then(res => {
      let { availability } = res.data;
        if(availability){
          dispatch({type: SET_PROJECT_NAME, payload: {projectName: project, projectId}})
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
  
  const handleProjectName = (val) => {
    let shrtCode = Math.floor(Math.random() * 90 + 10);
    setError(null);
    setProjectName(val)
    
    if(String(val).length > 16){
      setError('Maximum of 16 Characters');
      return; 
    }
    
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/; 
    if(regex.test(val) ){
      setError('With Special Characters');
      return;
    } 
    
    let newStr = String(val).replace(/\s/g, '-').toLowerCase()

    setProjectId(`${newStr}-${shrtCode}-app`)
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
      <form
        onSubmit={handleCreate}
      >
          <TextField
          fullWidth
          size='small'
          label="Project Name"
          margin="normal"
          value={project}
          onChange={(e) => handleProjectName(e.target.value)}
          error={error}
          helperText={(error && error) || (projectId && <Typography variant='body2'>Project ID: <strong>{projectId}</strong></Typography>)}
        /*   InputProps={{
            endAdornment: (
              <InputAdornment position="end">
               <Typography variant="body2">{project ? projectId : ''}</Typography>
              </InputAdornment>
            ),
          }} */
        />
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", mt: '50px'}}>
          <Button variant="contained"
          type="submit"
          >
            CREATE
          </Button>
          </Box>
          </form>
          </Container>
          :
          <Projects />
          }
  {/* <ProjectOverview/> */}
          </Box>
    </>
  )
}
