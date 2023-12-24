import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CopyRight from '../components/CopyRight';
import { Link } from 'react-router-dom';
import { env_vars } from '../utils/config';
import axios from 'axios';
import CoinSpin from '../CoinSpin';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignInSide = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = React.useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({})

        const data = new FormData(event.currentTarget);
        await axios.post(`${env_vars.api_url}/auth/login`, {
            email: data.get('email'),
            password: data.get('password'),
        })
            .then(response => {
                let { token } = response.data;
                localStorage.setItem('token', token)
                navigate('/');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors)
                }
            })
            ;




    };

    React.useEffect(() => {
        localStorage.removeItem('token')
    }, [])


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                helperText={errors.email && errors.email}
                                error={errors.email}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={errors.password && errors.password}
                                error={errors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/*   <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link> */}
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <CopyRight sx={{ mt: 5 }} />
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}


export default SignInSide