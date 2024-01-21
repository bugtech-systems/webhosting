import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import { Link, useNavigate } from 'react-router-dom';
import { CLEAR_CREATE, CLEAR_PROJECT_NAME } from 'redux/actions/types';
import { useDispatch, useSelector } from 'react-redux';

const categories = [
  {
    id: 'Build',
    children: [
      { id: 'Service', icon: <PublicIcon />, path: "/dashboard/service", disabled: false },
      { id: 'Database', icon: <DnsRoundedIcon />, path: "/dashboard/databases", disabled: true },
      { id: 'Storage', icon: <PermMediaOutlinedIcon />, path: "/dashboard/storage", disabled: true },
    ],
  },

];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const { projectName } = useSelector(({data}) => data);
  const navigate = useNavigate();
console.log(!projectName, 'PROJ', projectName)
  

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Shared Hosting
        </ListItem>
        <ListItem 
        sx={{ ...item, ...itemCategory }} 
          onClick={() => {
              dispatch({type: CLEAR_CREATE})
              navigate('/dashboard');
              
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path, disabled }) => (
              <ListItem disablePadding key={childId}   >
                <ListItemButton 
                  sx={item} component={Link} 
                  to={path}  
                  disabled={(disabled || !projectName)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}