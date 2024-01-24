import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CopyRight from '../components/CopyRight';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MOBILE_OPEN } from 'redux/actions/types';
import FooterWithInput from 'components/Footer/FooterWithInput';
import Faq from 'components/Pricing/FAQ';
import IconPageBreak from 'components/Pricing/IconPageBreak';
import Header from 'components/Pricing/Header';
import {COLORS} from 'constants/constants'

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            '1 Website included',
            'Custom Subdomains',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        authButtonText: 'Get Started',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            'Up to 10 Websites',
            'Custom Domains',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        authButtonText: 'Get Started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            'Unlimited Websites',
            'Custom Domains',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        authButtonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

const tiers2 = [
    {
        title: 'Free',
        price: '0',
        description: [
            '1 Website included',
            'Custom Subdomains',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        authButtonText: 'Get Started',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            'Up to 10 Websites',
            'Custom Domains',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        authButtonText: 'Get Started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            'Unlimited Websites',
            'Custom Domains',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        authButtonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

export default function Pricing() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');
    const dispatch = useDispatch();
  const { mobileOpen } = useSelector(({ui}) => ui);
    

    const handleClick = (event) => {
        event.preventDefault();
        if (isAuthenticated) {
            navigate('/')
        } else {
            navigate('/signup')
        }

    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "/login";
    };
    
    
    
    const handleDrawerToggle = () => {
        dispatch({type: SET_MOBILE_OPEN, payload: !mobileOpen});
      };

    return (
        <>
        <Container disableGutters={true}>

            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider'}}>

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {"SHARED HOSTING"}
                </Typography>
                {isAuthenticated ?
                    <Button onClick={handleLogout} variant="outlined" size="small">
                        Logout
                    </Button>
                    :
                    <Button component={Link} to="/signup" variant="outlined" size="small">
                        Sign up
                    </Button>
                }
            </Toolbar>
                <Container disableGutters={true} component="main" sx={{ pt: 8, pb: 6, marginLeft: 2, padding: 5 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" component="p">Elevate Your Web Presence, Effortlessly.
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" component="p">Hosting That Speaks Performance, Security, and Support.
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" component="p">Your Website's Success, Simplified, Right Here!.
                    </Typography>
                </Container>
                <Container disableGutters={true} sx={{padding: 5 }}>
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                                        subheaderTypographyProps={{
                                            align: 'center',
                                        }}
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'light'
                                                    ? theme.palette.grey[200]
                                                    : theme.palette.grey[700],
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                ₱{tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                        </Box>
                                        <ul style={{ marginLeft: -15}}>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="left"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth onClick={handleClick} id={tier[isAuthenticated ? 'authButtonText' : 'isAuthenticated']} variant={tier.buttonVariant}>
                                            {tier[isAuthenticated ? 'authButtonText' : 'isAuthenticated']}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    
                    
                    </Container>
                    
                    
                    {/* Footer */}
                    
                    </Container>
                    <IconPageBreak />
                    <Faq />
                    <FooterWithInput />

        </>
        
    );
}