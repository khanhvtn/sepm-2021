import React, { useState, useEffect } from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {
    MonetizationOn,
    AccountBalanceWallet,
    ExitToApp,
    SportsEsports,
} from '@material-ui/icons';
import logo from '../../images/Logo.png';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { CLEAR_ERROR } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { authData, isUserChecking } = useSelector((state) => state.auth);
    const [user, setUser] = useState(authData);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElCat, setAnchorElCat] = useState(null);

    const [mobileUnAuthMoreAnchorEl, setMobileUnAuthMoreAnchorEl] = useState(
        null
    );

    useEffect(() => {
        setUser(authData);
    }, [authData]);

    //Logout
    const logout = () => {
        dispatch({
            type: CLEAR_ERROR,
        });
        dispatch({
            type: 'LOGOUT',
        });
        history.push('/');
        setUser(null);
        handleMenuClose();
    };

    //handle to go to register page
    const handleGoToAuth = (type) => {
        type === 'register'
            ? history.push('/register')
            : history.push('/login');
    };

    //handle to go to user profile
    const handleGoToProfile = (type) => {
        const action = type === 'profile' ? 0 : type === 'wallet' ? 1 : 2;
        history.push('/user-profile', {
            action,
        });
        handleMenuClose();
    };
    const handleGoToGameCenter = () => {
        history.push('/game-center');
        handleMenuClose();
    };

    //handle go to cat
    const handleGoToCat = (type) => {
        history.push({
            pathname:`/vouchers/category/${type}`,
            state: {category: type}
        })
        handleMenuCatClose();
    }

    //handle to go to user profile
    const handleGoToShareLink = () => {
        history.push('/share-link');
        handleMenuClose();
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileUnAuthMoreAnchorEl = Boolean(mobileUnAuthMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCategoryMenuOpen = (event) => {
        setAnchorElCat(event.currentTarget)
    }

    const handleMobileUnAuthMenuOpen = (event) => {
        setMobileUnAuthMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuCatClose = () => {
        setAnchorElCat(null);
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
            <MenuItem
                className={classes.btnGameCenter}
                onClick={handleGoToGameCenter}
            >
                <IconButton aria-label="game center" color="inherit">
                    <SportsEsports />
                </IconButton>
                <p>Game Center</p>
            </MenuItem>
            <MenuItem onClick={() => handleGoToProfile('changecoin')}>
                <IconButton aria-label="change coin" color="inherit">
                    <MonetizationOn />
                </IconButton>
                <p>Change Coin</p>
            </MenuItem>
            <MenuItem onClick={() => handleGoToProfile('wallet')}>
                <IconButton aria-label="wallet of current user" color="inherit">
                    <AccountBalanceWallet />
                </IconButton>
                <p>My Wallet</p>
            </MenuItem>
            <MenuItem onClick={() => handleGoToProfile('profile')}>
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

    const renderMenuCategory = (
        <Menu
            id="simple-menu"
            anchorEl={anchorElCat}
            keepMounted
            open={Boolean(anchorElCat)}
            onClose={handleMenuCatClose}
        >
            <MenuItem onClick={() => handleGoToCat('food&beverage')}>Food and Beverage</MenuItem>
            <MenuItem onClick={() => handleGoToCat('beauty')}>Beauty</MenuItem>
            <MenuItem onClick={() => handleGoToCat('travel')}>Travel</MenuItem>
            <MenuItem onClick={() => handleGoToCat('all')}>See All</MenuItem>

        </Menu>
    )

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
            {isUserChecking ? (
                ''
            ) : (
                <div>
                    <MenuItem onClick={() => handleGoToAuth('register')}>
                        Register
                    </MenuItem>
                    <MenuItem onClick={() => handleGoToAuth('login')}>
                        Login
                    </MenuItem>
                </div>
            )}
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
                    <Link to="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="logo"
                            height="60"
                        />
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search???"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleCategoryMenuOpen}>
                            Category
                        </Button>
                        {renderMenuCategory}
                    </div>

                    {/* </Toolbar>
            </AppBar> */}

                    <div className={classes.grow} />
                    {user ? (
                        <>
                            <div className={classes.sectionDesktop}>
                                <Button
                                    color="inherit"
                                    onClick={handleGoToShareLink}
                                >
                                    Share Link
                                </Button>
                                <Button
                                    color="inherit"
                                    endIcon={<SportsEsports />}
                                    onClick={handleGoToGameCenter}
                                >
                                    Game Center
                                </Button>
                                <Button
                                    color="inherit"
                                    endIcon={<MonetizationOn />}
                                >
                                    {user.result.points}
                                </Button>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Avatar
                                        className={classes.avatar}
                                        alt={user.result.name}
                                        src={
                                            user.result.imageUrl
                                                ? user.result.imageUrl
                                                : '/error.png'
                                        }
                                    />
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
                                {isUserChecking ? (
                                    ''
                                ) : (
                                    <div>
                                        <Button
                                            className={classes.btnAuth}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                handleGoToAuth('register')
                                            }
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            className={classes.btnAuth}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                handleGoToAuth('login')
                                            }
                                        >
                                            Login
                                        </Button>
                                    </div>
                                )}
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
