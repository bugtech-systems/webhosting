import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Header from '../components/Header';
import { AppBar, IconButton, Link } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MainFeaturedPost from 'components/MainFeaturedPost';


const StyledContainer = styled(Container)({
  paddingTop: theme => theme.spacing(8),
  paddingBottom: theme => theme.spacing(6),
});

const StyledAccordion = styled(Accordion)({
  marginBottom: theme => theme.spacing(2),
});

const StyledButton = styled(Button)({
  backgroundColor: theme => theme.palette.primary.main,
  color: theme => theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme => theme.palette.primary.dark,
  },
});

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      /* onInput={(e) => {
        setSearchQuery(e.target.value);
      }} */
      label="Search our Help Pages"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

const mainFeaturedPost = {
  title: 'Frequently Ask Questions',
  description:
    "Have questions? Here you'll find the answer most valued by our partners, along with access to step-by-step instructions and support.",
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
    question: 'How Can I Change My Subscriptions?',
    answer: 'Consider your website requirements, traffic, and budget. Shared hosting is cost-effective for small sites, while dedicated hosting offers more resources for larger projects.',
  },
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

export default function Faq() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  
  const sections = [
    { title: 'Section 1', url: '/section1' },
    { title: 'Section 2', url: '/section2' },
    // Add more sections as needed
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>

      <StyledContainer maxWidth="lg">

        <Header sections={sections} title="FAQ" leftActionPage="Dashboard" />
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container flexDirection="row" justifyContent="center" marginTop="20px">
          <Grid item xs={12} md={12}>
            <Grid container flexDirection="row" justifyContent="flex-end" marginTop="20px">
              <Grid item xs={6} md={6}>
                <StyledContainer className={classes.container}>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="left"
                    color="text.primary"
                    gutterBottom
                  >
                    Need a hand?
                    We Got you.
                  </Typography>
                  <SearchBar />
                  <div style={{ padding: 5 }}>
                    <div
                      className="text"
                      style={{
                        padding: 5,
                        justifyContent: "normal",
                        fontSize: 20,
                        color: "blue",
                        margin: 1,
                        width: "250px",
                        BorderColor: "green",
                        borderWidth: "10px"
                      }}
                    >
                    </div>
                  </div>
                </StyledContainer>
              </Grid>
              <Grid item xs={6} md={6}>
                <StyledContainer className={classes.container}>
                  {faqData.map((item, index) => (
                    <StyledAccordion
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
                    </StyledAccordion>
                  ))}
                </StyledContainer>
                </Grid>
            </Grid>
            <Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" marginTop="20px">
          <Grid item xs={12} md={6}>
            <StyledButton fullWidth variant="contained" className={classes.button}>
              Contact Us
            </StyledButton>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

