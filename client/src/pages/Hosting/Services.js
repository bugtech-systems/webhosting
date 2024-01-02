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


const cards = [
    {
        title: "ReactJS",
        img: ReactIcon,
        path: "/dashboard/setup/react"
    },
    {
        title: "NodeJs/Express",
        img: NodeExpressIcon,
        path: "/dashboard/setup/express"
    },
    {
        title: "WordPress",
        img: WordPress,
        path: "/dashboard/setup/wordpress"
    }
];


export default function Services() {
  const navigate = useNavigate();

  return (
    <>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ p: '5px', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        sx={{
                      // width: 'auto', 
                      height:{ xs: '200px', md: '150px'},
                    //   ima
                    //  m: 5,
                    //  pr: '75px',
                    p: '10px'
                    //   m: '2.25%',
                     
                    }}
                    
                    image={card.img}
                  />
                  <CardContent sx={{ height: '50px',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography  variant="h6" component="h2">
                     {card.title}
                    </Typography>
                   {/*  <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography> */}
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CardActions >
                    <Button variant="outlined" size="small" 
                      onClick={() => navigate(card.path)}
                    >Setup</Button>
                  </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </>
  )
}
