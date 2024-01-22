import React, { useState } from 'react'
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
import MongodbIcon from 'images/MONGODB.png';
import PostgreIcon from 'images/POSTGRES.png';
import MySqlIcon from 'images/MYSQL.png';
import NodeExpressIcon from 'images/nodeExpress.png';
import WordPress from 'images/wordpress.png';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Toolbar } from '@mui/material';
import Header from 'pages/Header';
import { SET_MOBILE_OPEN } from 'redux/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import Bio from 'components/Bio';
import CustomModal from 'components/Modals/CustomModal';

const cards = [
  {
    title: "MySQL",
    img: MySqlIcon,
    path: "/dashboard/setup/mysql",
    disabled: false
  },
  {
    title: "PostgreSQL",
    img: PostgreIcon,
    path: "/dashboard/setup/postgre",
    disabled: false
  },
  {
    title: "MongoDB",
    img: MongodbIcon,
    path: "/dashboard/setup/mongodb",
    disabled: false
  }
];

const values = [
  {
    id: 0,
    value: 'MongoDB',
    title: ['Database name', 'Collection name'],
    additionalPreference: ['MongoDb Option 1', 'MongoDb Option 2', 'MongoDb Option 3']
  },
  {
    id: 1,
    value: 'MySQL',
    title: ['Database name', 'Collection name'],
    additionalPreference: ['MySQL Option 1', 'MySQL Option 2', 'MySQL Option 3']
  },
  {
    id: 2,
    value: 'PostgreSQL',
    title: ['Database name', 'Collection name'],
    additionalPreference: ['PostgreSQL Option 1', 'PostgreSQL Option 2', 'PostgreSQL Option 3']
  }
]

export default function Database(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mobileOpen } = useSelector(({ ui }) => ui);
  const [isModalOpen, setModalOpen] = useState('');
  const [val, setVal] = useState([]);

console.log(props, "Props")

  const sections = [
    { title: 'Section 1', url: '/section1' },
    { title: 'Section 2', url: '/section2' },
    // Add more sections as needed
  ];
  

  const handleDrawerToggle = () => {
    dispatch({ type: SET_MOBILE_OPEN, payload: !mobileOpen });
  };

  const handleOpenModal = (data) => {
  console.log(data, "DATA")
    const selectedValue = values.find(item => item.value === data.id);
    console.log(selectedValue, "??????")
    setVal(selectedValue ? [selectedValue] : []);
    setModalOpen(data.id);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  
  return (
    <>
      <Header screenName='' onDrawerToggle={handleDrawerToggle} />
      <CssBaseline />
      <Box component="main" sx={{ flex: 1, py: 1, px: 1, bgcolor: '#eaeff1' }}>
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
                      height: { xs: '100%', md: '100%' },
                      p: '10px',
                    }}
                    image={card.img}
                  />
                  <CardContent sx={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h6" component="h2">
                      {card.title}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CardActions >
                      <Button variant="outlined" size="small"
                        id={card.title}
                        onClick={(e) => handleOpenModal(e.target)}
                        disabled={card.disabled}
                      >Setup</Button>
                      <CustomModal open={isModalOpen} handleClose={handleCloseModal} values={val}/>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </Container>
        <div style={{ textAlign: 'center'}}>
          </div>
      </Box>
    </>
  )
}
