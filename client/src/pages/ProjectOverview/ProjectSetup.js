import React, { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactIcon from 'images/React.png';
import NodeExpressIcon from 'images/nodeExpress.png';
import WordPress from 'images/wordpress.png';
import Header from './Header';
import MainFeaturedPost from 'components/MainFeaturedPost';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MOBILE_OPEN, SET_PROJECT_NAME } from 'redux/actions/types';
import Projects from './Projects';

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const drawerWidth = 256;


const mainFeaturedPost = {
  title: 'Hosting Made Easy',
  description:
    "The Easiest Way to Launch Your Website online: Drag, Drop, Done!",
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
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({type: SET_PROJECT_NAME, payload: project})
    navigate('/dashboard/service')
  }
  
  
  const handleDrawerToggle = () => {
    dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
  };
  
  
  
  console.log(projects, 'projects')
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
          <Projects/>
          }
  {/* <ProjectOverview/> */}
          </Box>
      
    </>
  )
}
