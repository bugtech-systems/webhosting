import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { Box } from '@mui/system';
import { FormControlLabel, IconButton, Switch } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { env_vars } from '../utils/config';


function FeaturedPost({ post, handleSsl, handleDelete }) {
    const [url, setUrl] = React.useState(null);
    const [info, setInfo] = React.useState({
        title: '',
        description: '',
        image: '',
    });






    const handleFetchInfo = async () => {
        try {
            const response = await axios.get(`${env_vars.api_url}/file/url?url=${url}`);
            const { title, description, image } = response.data;
            setInfo({ title, description, image });
        } catch (error) {
            console.error('Error fetching URL info:', error.message);
            // Handle error
        }
    };
    console.log(post, 'FEATURED', info)

    React.useEffect(() => {
        let currentUrl = `${post.ssl ? 'https' : 'http'}://${post.subdomain}.${post.host}`;
        console.log(currentUrl, 'URL')
        setUrl(currentUrl)
        handleFetchInfo()

    }, [post])


    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <FormControlLabel control={<Switch
                                checked={post.ssl}
                                onChange={() => handleSsl(post.subdomain)}
                            />} label="SSL Secured" />

                        </Box>

                        <Typography variant="subtitle1" color="text.secondary">
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                        {info.title && <Typography variant="subtitle1" paragraph>
                            {info.title}
                        </Typography>
                        }
                        <Box display="flex" justifyContent="space-between">
                            <Typography component={Link} variant="subtitle1" color="primary" target={"_blank"} to={url}>
                                Visit Website...
                            </Typography>
                            <IconButton onClick={() => handleDelete(post.subdomain)}>
                                <DeleteForeverIcon color="error" />
                            </IconButton>
                        </Box>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={info.image ? info.image : post.image}
                        alt={post.imageLabel}
                    />
                </Card>
            </CardActionArea>
        </Grid >
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    handleSsl: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default FeaturedPost;