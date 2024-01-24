import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header(props) {
    const { title, leftActionPage } = props;
    const isAuthenticated = localStorage.getItem('token');

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = "/login";
    };

    const renderLeftAction = () => {
        if (leftActionPage === 'Dashboard') {
            return (
                <Button component={Link} to="/dashboard" size="small" variant="outlined">
                    Dashboard
                </Button>
            );
        } else if (leftActionPage === 'FAQ') {
            return (
                <Button component={Link} to="/faq" size="small" variant="outlined">
                    FAQ
                </Button>
            );
        } else {
            return (
                <Button component={Link} to="/pricing" size="small" variant="outlined">
                    Subscribe
                </Button>
            );
        }
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                {renderLeftAction()}

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
    leftActionPage: PropTypes.string.isRequired,
};

export default Header;
