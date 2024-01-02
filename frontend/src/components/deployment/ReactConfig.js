import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ReactConfig() {
  const [configs, setConfigs] = React.useState({
    rootDir: "/",
    buildDir: "/build",
    nodeVersion: "v18",
    startScript: "build",
    ssl: false
  });

  const handleChange = prop => event => {
  setConfigs({...configs, [prop]: event.target.value})
  };

console.log(configs, 'conf')

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
        <Typography variant="body1" >Project Folder</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="none" size="small">
        <InputLabel id="demo-simple-select-label">Root Path</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={configs.rootDir}
          label="Root Path"
          onChange={handleChange('rootDir')}
        >
          <MenuItem value="/">/</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} md={6} >
        <Typography variant="body1" >Build Folder</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="none" size="small">
        <InputLabel id="demo-simple-select-label">Build Path</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={configs.buildDir}
          label="Build Path"
          onChange={handleChange('buildDir')}
        >
          <MenuItem value="/build">/build</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} md={6} >
        <Typography variant="body1" >Node Version</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="none" size="small">
        <InputLabel id="demo-simple-select-label">Version</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={configs.nodeVersion}
          label="Version"
          onChange={handleChange('nodeVersion')}
        >
          <MenuItem value="v20">v20</MenuItem>
          <MenuItem value="v18">v18</MenuItem>
          <MenuItem value="v16">v16</MenuItem>
          <MenuItem value="v14">v14</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} md={6} >
        <Typography variant="body1" >Build Script</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="none" size="small">
        <InputLabel id="demo-simple-select-label">Command</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={configs.startScript}
          label="Command"
          onChange={handleChange('startScript')}
        >
          <MenuItem value="build">build</MenuItem>
          <MenuItem value="start">start</MenuItem>
        </Select>
      </FormControl>
        </Grid>
       {/*  <Grid item md={6}>
      
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" onChange={() => setConfigs({...configs, ssl: !configs.ssl})} checked={configs.ssl} />}
            // onClick={() => {setConfigs({...configs, ssl: !configs.ssl}); console.log('CLICKED!')}}
            label="SSL CERTIFIED"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}