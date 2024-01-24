import React from 'react';
import { Container, Typography, Grid, TextField, Button, styled, Input, Paper } from '@mui/material';
import COLORS from 'constants/constants';

const StyledContainer2 = styled(Container)`
  && {
    padding-top: ${({ theme }) => theme.spacing(8)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const StyledGrid = styled(Grid)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const FooterWithInput = () => {
  const rowListContent = [
    {
      headerRow: 'Resources',
      columnList: ['Docs', 'Pricing', 'FAQ', 'Guides', 'Integrations', 'Help'],
    },
    {
      headerRow: 'Product',
      columnList: ['Infrastructure', 'Storage', 'Analytics', 'CLI & API'],
    },
    {
      headerRow: 'Company',
      columnList: ['About', 'Careers', 'Next.js Conf', 'Privacy Policy', 'Blog'],
    },
    {
      headerRow: 'Hosting',
      columnList: ['Shared Hosting', 'WordPress Hosting', 'Dedicated Servers'],
    },
  ];

  return (
    <Container maxWidth="false" disableGutters sx={{background: 'linear-gradient(to right, white, #C9CED6, #A7AEBB, #8A94A6, #A7AEBB, #C9CED6, white)', width: '100%', marginLeft: 1}}>
    <Grid container item xs={12} md={12} lg={12} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
      <Grid elevation={3}  style={{ padding: 20, display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'space-evenly'  }}>
        {rowListContent.map((row, rowIndex) => (
          <Grid item xs={12} md={12} lg={12} key={rowIndex} sx={{alignItems: 'center', justifyContent: 'center'}}>
              {<Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }, fontWeight: '600' }}>
                {row.headerRow}
              </Typography>}
              <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',}}>
                {row.columnList.map((column, columnIndex) => (
                  <Typography key={columnIndex} sx={{ fontSize: {sm: '.8rem', xs: '.8rem', md: '1.2rem', lg: '1.3rem' } }}>{'•' + ' ' +column}</Typography>
                ))}
              </li>
              </Grid>
              ))}
              </Grid>
      </Grid>
    </Container>
  );
};

export default FooterWithInput;