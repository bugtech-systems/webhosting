import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import LocationOn from '@mui/icons-material/LocationOn';
import grey from '@mui/material/colors/grey';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectCard = ({ cardDetails, onCheck }) => {
    let { projectName, url, ssl } = cardDetails;

  return (
    <Card>
  <Box sx={{ p: 2, display: 'flex', width: '100%' }}>
    <Stack spacing={0.5} sx={{flexGrow: 1}}>
      <Typography  fontWeight="bold">{projectName}</Typography>  
      <Link to={url} target='_blank' style={{color: "#081627"}} >
        {url}
      </Link>
    </Stack>
    <IconButton size="small">
      <Edit fontSize="small" />
    </IconButton>
  </Box>
  <Divider />
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Chip
      label={ssl ? 'Secure Connection' : 'Unsecure Connection'}
      color={ssl ? 'success' : 'default'}
      size="small"
    />
      <FormControlLabel control={<Switch onChange={() => onCheck(cardDetails)} checked={ssl} />} label="SSL" />

  </Stack>
</Card>
  );
};

export default ProjectCard;
