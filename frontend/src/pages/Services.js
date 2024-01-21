import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReactIcon from 'images/React.png';
import NodeExpressIcon from 'images/nodeExpress.png';
import WordPress from 'images/wordpress.png';
import { useNavigate } from 'react-router-dom';


const cards = [
    {
        title: "ReactJS",
        img: ReactIcon,
        path: "/dashboard/setup/react",
        disabled: false
    },
    {
        title: "NodeJs/Express",
        img: NodeExpressIcon,
        path: "/dashboard/setup/express",
        disabled: true
    },
    {
        title: "WordPress",
        img: WordPress,
        path: "/dashboard/setup/wordpress",
        disabled: true
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
                      height:{ xs: '100%', md: '100%'},
                    p: '10px'
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
                      disabled={card.disabled}
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
