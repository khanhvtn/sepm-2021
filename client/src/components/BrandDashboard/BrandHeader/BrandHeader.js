import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Menu,
    MenuItem,
    IconButton,
    Toolbar,
    Avatar,
    Grid,
    Hidden,
    Tooltip
} from '@material-ui/core';
import {
    ExitToApp
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';



function BrandHeader(props) {
    const { onDrawerToggle } = props;
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const { brandData } = useSelector((state) => state.auth);
    const [user, setUser] = useState(brandData);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        setUser(brandData);
    }, [brandData]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //handle to go to user profile
    const handleGoToProfile = (type) => {
        history.push('/dashboard/brand/profile')
        handleMenuClose();
    };

    //Logout
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        history.push('/brand/login');
        setUser(null);
        handleMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleGoToProfile}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>My Profile</p>
            </MenuItem>

            <MenuItem onClick={logout}>
                <IconButton aria-label="logout" color="inherit">
                    <ExitToApp />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar color="default" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            {user && (
                                <IconButton
                                    color="inherit"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    className={classes.iconButtonAvatar}>
                                    <Avatar
                                        src={user.brandImage}
                                        alt="My Avatar" />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    );
}

BrandHeader.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default BrandHeader;