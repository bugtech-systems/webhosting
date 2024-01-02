import React from 'react'
import Header from 'pages/Header'
import ProjectOverview from './Services'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import { SET_MOBILE_OPEN } from 'redux/actions/types';

export default function Hosting() {
  const dispatch = useDispatch();
  const { mobileOpen } = useSelector(({ui}) => ui);


  const handleDrawerToggle = () => {
  
    dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
  };
  return (
    <>
           <Header  
           onDrawerToggle={handleDrawerToggle}
           />
          
          <Box component="main" sx={{ flex: 1, py: 1, px: 1, bgcolor: '#eaeff1' }}>
 <ProjectOverview/>
</Box>
    </>
  )
}
