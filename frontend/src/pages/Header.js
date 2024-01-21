import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const lightColor = 'rgba(255, 255, 255, 0.7)';


function Header(props) {
  const { onDrawerToggle } = props;

  const handleLogout = (event) => {
      event.preventDefault()
      localStorage.removeItem('token');
      window.location.href = "/login"
  }



  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
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
            <Tooltip title="Help">
            <IconButton color="inherit" component={Link} to="/pricing">
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
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
       
      </AppBar>
     {/*  <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
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