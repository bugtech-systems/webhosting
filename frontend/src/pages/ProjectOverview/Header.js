import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SET_CREATE } from 'redux/actions/types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, styled, Paper } from '@mui/material';

const lightColor = 'rgba(255, 255, 255, 0.7)';




function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { createNew } = useSelector(({ui}) => ui);
    
    console.log(createNew, "TITLE?")

  const { onDrawerToggle, hasProject } = props;

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('token');
    window.location.href = "/login"
}

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({type: SET_CREATE})
    navigate('/dashboard')
  }
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            
            <Grid item xs />
            <Grid item>
            <Tooltip title="Help Center">
            <IconButton color="inherit" component={Link} to="/faq" >
              <InfoIcon />
            </IconButton>
          </Tooltip>
            </Grid>
            <Grid item>
            <Tooltip title="Help">
            <IconButton color="inherit" component={Link} to="/pricing" >
              <HelpIcon />
            </IconButton>
          </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
            <Button
            sx={{ borderColor: lightColor }}
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
            </Grid>
          </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
            {createNew ? "New Project" : "My Projects"}
              </Typography>
            </Grid>
            <Grid item>
            {hasProject &&
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleCreate}
              >
                Create New
              </Button>
              }
            </Grid>
            <Grid item>
             
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
   {/*    <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={activeTab} textColor="inherit" onChange={setActiveTab}>
          <Tab label="NodeJS" {...a11yProps(0)} />
          <Tab label="ReactJS" {...a11yProps(1)} />
          <Tab label="WordPress"{...a11yProps(2)}/>
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.bool.isRequired,

};

export default Header;