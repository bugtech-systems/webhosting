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
import { deleteProject, sslCertificate } from 'redux/actions/data.action';
import FileUploadService from 'utils/FileUploadService';



export default function () {
  const dispatch = useDispatch()
  let {projects} = useSelector(({data}) => data)
  
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
  
  
  const handleCheck = ind => (e) => {
      
    dispatch(sslCertificate({projectName: e.projectName}))
    .then(() => {
      handleGetFiles()
    })
    .catch(err => {
      console.log(err)
    
    })
    
  }


  const handleClick = (data) => {
    dispatch(deleteProject({projectName: data.projectName}))
    .then(res => {
      handleGetFiles()
    })
    .catch(err => {
      console.log(err)
    
    })
    
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
                  onDelete={handleClick}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
    </>
  )
}
