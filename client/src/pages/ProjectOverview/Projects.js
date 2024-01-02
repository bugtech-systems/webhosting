import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactIcon from 'images/React.png';
import NodeExpressIcon from 'images/nodeExpress.png';
import WordPress from 'images/wordpress.png';
import { useNavigate } from 'react-router-dom';
import ProjectCard from 'components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROJECTS } from 'redux/actions/types';



export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let {projects} = useSelector(({data}) => data)
  
  const handleCheck = ind => (e) => {
      
    projects[ind] = { ...e, ssl: !e.ssl }
    dispatch({type: SET_PROJECTS, payload: projects});
    
    console.log(e, 'checked', ind)
  }



  return (
    <>
        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {projects.map((card,index) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <ProjectCard cardDetails={card}
                  onCheck={handleCheck(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
    </>
  )
}
