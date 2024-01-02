import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SET_CREATE } from 'redux/actions/types';
import { useDispatch } from 'react-redux';

const lightColor = 'rgba(255, 255, 255, 0.7)';




function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
  const { onDrawerToggle, activeTab, setActiveTab, hasProject } = props;


  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({type: SET_CREATE})
    navigate('/dashboard')
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
            {/*   <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link> */}
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
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
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
             MY PROJECTS
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
              <Tooltip title="Help">
                <IconButton color="inherit"
                  onClick={() => navigate('/docs') }
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
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