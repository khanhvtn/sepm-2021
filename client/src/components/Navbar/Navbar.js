import React, { useState } from 'react';
import { useCountUp } from 'react-countup';
import {
    AppBar,
    Menu,
    MenuItem,
    IconButton,
    Toolbar,
    InputBase,
    Button,
    Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {
    MonetizationOn,
    AccountBalanceWallet,
    ExitToApp,
} from '@material-ui/icons';
import logo from '../../images/Logo.png';
import useStyles from './styles';
import avatar from '../../images/test-image.JPG';
const Navbar = () => {
    const classes = useStyles();
    const { countUp } = useCountUp({ end: 1000 });
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileUnAuthMoreAnchorEl, setMobileUnAuthMoreAnchorEl] = useState(
        null
    );

    const isMenuOpen = Boolean(anchorEl);
    const isMobileUnAuthMoreAnchorEl = Boolean(mobileUnAuthMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileUnAuthMenuOpen = (event) => {
        setMobileUnAuthMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileUnAuthMenuClose = () => {
        setMobileUnAuthMoreAnchorEl(null);
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
            <MenuItem>
                <IconButton aria-label="change coin" color="inherit">
                    <MonetizationOn />
                </IconButton>
                <p>Change Coin</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="wallet of current user" color="inherit">
                    <AccountBalanceWallet />
                </IconButton>
                <p>My Wallet</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
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

            <MenuItem onClick={handleMenuClose}>
                <IconButton aria-label="logout" color="inherit">
                    <ExitToApp />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    const mobileUnAuthMenuId = 'mobile-unauth-menu-id';
    const renderMobileUnAuthMenu = (
        <Menu
            anchorEl={mobileUnAuthMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileUnAuthMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileUnAuthMoreAnchorEl}
            onClose={handleMobileUnAuthMenuClose}
        >
            <MenuItem onClick={handleMobileUnAuthMenuClose}>Register</MenuItem>
            <MenuItem onClick={handleMobileUnAuthMenuClose}>Login</MenuItem>
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar
                className={classes.appBar}
                position="sticky"
                color="inherit"
            >
                <Toolbar disableGutters={true}>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt="logo"
                        height="60"
                    />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    {auth ? (
                        <>
                            <div className={classes.sectionDesktop}>
                                <Button
                                    color="inherit"
                                    endIcon={<MonetizationOn />}
                                >
                                    {countUp}
                                </Button>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Avatar alt="Khanh Vo" src={avatar} />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={classes.sectionDesktopUnAuth}>
                                <Button
                                    className={classes.btnAuth}
                                    variant="outlined"
                                    color="secondary"
                                >
                                    <Link
                                        className={classes.removeStyleLink}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </Button>
                                <Button
                                    className={classes.btnAuth}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <Link
                                        className={classes.removeStyleLink}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </Button>
                            </div>
                            <div className={classes.sectionMobileUnAuth}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileUnAuthMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileUnAuthMenuOpen}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileUnAuthMenu}
        </div>
    );
};

export default Navbar;
