import React from 'react';
import { Grid, Typography } from "@mui/material";
import { COLORS } from "constants/constants";

const icons = ['MONGOOSE', 'JS', 'REACT', 'NODEJS', 'ANDROID', 'IOS', 'GIT', 'CSS', 'GITHUB', 'GITLAB', 'HTML', 'JAVA', 'BOOTSTRAP', 'EXPRESS', 'MONGODB', 'MYSQL', 'POSTGRES', 'PYTHOON', 'REDIS', 'VUEJS'];

const IconPageBreak = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        // backgroundColor: COLORS.gray500,
        background: 'linear-gradient(to right, white, #A7AEBB, #8A94A6, #A7AEBB, white)',
        paddingBottom: '10px',
        marginTop: '1px',
        marginBottom: -10,
        paddingTop: '5rem',
        paddingBottom: 5
      }}
    >
      {icons.map((icon, index) => (
        <Grid
          key={index}
          item
          xs={2}
          sm={1}
          md={2}
          lg={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <img
            src={`${icon}.png`}
            alt={icon}
            style={{ height: '50px', width: '50px' }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IconPageBreak;