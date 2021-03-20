import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import { getVouchers } from './actions/vouchers';
import Navbar from './components/Navbar/Navbar';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Footer from './components/Footer/Footer';
import BrandHome from './components/Brands/BrandHome/BrandHome';
import CreateBrand from './components/Brands/CreateBrand/CreateBrand';
import Auth from './components/Auth/Auth';
import UserProfile from './components/User/UserProfile';
import { checkCurrentUser } from './actions/auths';
import { useHistory } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(checkCurrentUser(history));
        dispatch(getVouchers());
    }, [currentId, dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.grow}>
                <Navbar />
                <Container
                    className={classes.mainContainer}
                    maxWidth="lg"
                    disableGutters
                >
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/create-voucher">
                            <CreateVoucher
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Route>
                        <Route exact path="/create-brand">
                            <CreateBrand />
                        </Route>

                        <Route exact path="/brand">
                            <BrandHome />
                        </Route>
                        <Route exact path="/login">
                            <Auth />
                        </Route>
                        <Route exact path="/register">
                            <Auth />
                        </Route>
                        <PrivateRoute
                            exact
                            path="/user-profile"
                            component={UserProfile}
                        />
                        {/* <Route exact path="/user-profile">
                            <UserProfile />
                        </Route> */}
                        <Route>
                            <Error />
                        </Route>
                    </Switch>
                </Container>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
