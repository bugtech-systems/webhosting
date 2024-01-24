import React from 'react';
import { Container, Typography, Grid, TextField, Button, styled, Input } from '@mui/material';
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
      headerRow: 'Hosting',
      columnList: ['Shared Hosting', 'WordPress Hosting', 'Dedicated Servers'],
    },
    {
      headerRow: 'Product',
      columnList: ['Infrastructure', 'Storage', 'Analytics', 'CLI & API'],
    },
    {
      headerRow: 'Resources',
      columnList: ['Docs', 'Pricing', 'FAQ', 'Guides', 'Integrations', 'Help'],
    },
    {
      headerRow: 'Company',
      columnList: ['About', 'Careers', 'Next.js Conf', 'Privacy Policy', 'Blog'],
    },
    {
      headerRow: 'Support',
      columnList: ['Contact Us', '24/7', 'Submit Ticket', 'Social'],
    },
  ];

  return (
    <StyledContainer2 maxWidth="false" sx={{backgroundColor: COLORS.lightGray}}>
    <StyledGrid container >
      <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        {rowListContent.map((row, index) => (
          <Grid item  key={index} xs={12} sm={6} md={3} lg={2} sx={{alignItems: 'center', justifyContent: 'center'}}>
              <Typography variant="h6" textAlign="left" >{row.headerRow}</Typography>
              <ul>
                {row.columnList.map((column, colIndex) => (
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                  <li key={colIndex}>{column}</li>
                  </Grid>
                ))}
              </ul>
          </Grid>
        ))}
      </Grid>
      {/* Title, Input Field, and Submit Button */}
    </StyledGrid>
    </StyledContainer2>
  );
};

export default FooterWithInput;