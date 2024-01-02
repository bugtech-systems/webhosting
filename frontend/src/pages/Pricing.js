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
import Header from '../components/Header';


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


export default function Pricing() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');

    const handleClick = (event) => {
        event.preventDefault();
        if (isAuthenticated) {
            navigate('/')
        } else {
            navigate('/signup')
        }

    }

    return (
        <>
            <Container maxWidth="lg">

                <Header title="SHARED HOSTING" leftActionPage="Dashboard" />
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
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
                <Container maxWidth="md" component="main">
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
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                ${tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
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
                <Container
                    maxWidth="md"
                    component="footer"
                    sx={{
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        mt: 8,
                        py: [3, 6],
                    }}
                >

                    <CopyRight sx={{ mt: 5 }} />
                </Container>
            </Container>

        </>
    );
}