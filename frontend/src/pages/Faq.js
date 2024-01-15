import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MainFeaturedPost from 'components/MainFeaturedPost';


const mainFeaturedPost = {
  title: 'Frequently Ask Questions',
  description:
    "Ultra-fast and reliable hosting for your non-profit. Ask how you can save with our exclusive discount.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const faqData = [
  {
    question: 'What is web hosting?',
    answer: 'Web hosting is a service that allows organizations and individuals to post a website or web page onto the Internet.',
  },
  {
    question: 'How do I choose a hosting plan?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
  {
    question: 'How Can I Set Up My WebSite?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
  {
    question: 'How Can I Change My Domain?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
  {
    question: 'How Can I Subscribe?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
  {
    question: 'How Can I Change My Subscribtions?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
  // Add more FAQ items as needed
];

const useStyles = styled((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Faq = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      
      <Container maxWidth="lg">
    <Header title="FAQ's" leftActionPage="Dashboard" />
      <MainFeaturedPost post={mainFeaturedPost} />
        <Container className={classes.container}>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
        <Grid container justifyContent="center" marginTop="20px">
          <Grid item xs={12} md={6}>
            <Button fullWidth variant="contained" className={classes.button}>
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Faq;
