import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Header from '../components/Header';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadFiles from '../components/UploadFile';
import FileUploadService from '../utils/FileUploadService';



const mainFeaturedPost = {
  title: 'Hosting Made Easy',
  description:
    "The Easiest Way to Launch Your Website online: Drag, Drop, Done!",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

export default function Dashboard() {
  const [sites, setSites] = React.useState([]);


  const handleSsl = (subdomain) => {
    FileUploadService.secureSsl(subdomain)
      .then(res => {
        console.log(res.data, 'res dash')
        handleGetFiles()
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = (subdomain) => {
    FileUploadService.deleteSite(subdomain)
      .then(res => {
        console.log(res, 'RES DELETE')
        handleGetFiles()
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleGetFiles = () => {
    FileUploadService.getFiles()
      .then(res => {
        setSites(res.data)
      })
      .catch(err => {
      if(err?.response?.status === 403){
        localStorage.clear();   
        window.location.href = '/';
      }
      });
  }

  React.useEffect(() => {
    handleGetFiles()

  }, [])

  return (

    <Container maxWidth="lg">
      <Header title="SHARED" leftActionPage="Pricing" />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        {sites.length !== 0 ?
          <Grid container spacing={4}>
            {sites.map((post, index) => (
              <FeaturedPost key={post._id} post={{ ...featuredPosts[index], title: post.subdomain, ...post }} handleSsl={handleSsl} handleDelete={handleDelete} />
            ))}
          </Grid>
          :
          <>
            <UploadFiles handleGetFiles={handleGetFiles} />
          </>
        }
      </main>
    </Container>


  );
}