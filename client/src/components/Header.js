import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header(props) {
    const { sections, title, leftActionPage } = props;
    const isAuthenticated = localStorage.getItem('token');

    const handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem('token');
        window.location.href = "/login"
    }


    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {leftActionPage === 'Dashboard' ?
                    <Button component={Link} to="/dashboard" size="small" variant="outlined">Dashboard</Button>
                    :
                    <Button component={Link} to="/pricing" size="small" variant="outlined">Subscribe</Button>
                }

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
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

        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;