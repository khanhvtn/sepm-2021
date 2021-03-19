import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import { getVouchers } from './actions/vouchers';
import Navbar from './components/Navbar/Navbar';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import { checkCurrentUser } from './actions/auths';
import UserProfile from './components/User/UserProfile';
import { useHistory } from 'react-router-dom';

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
        <Router>
            <ThemeProvider theme={theme}>
                <div className={classes.grow}>
                    <Navbar />
                    <Container
                        className={classes.mainContainer}
                        maxWidth="lg"
                        disableGutters
                    >
                        <Switch>
                            <Route exact path="/create-voucher">
                                <CreateVoucher
                                    currentId={currentId}
                                    setCurrentId={setCurrentId}
                                />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/login">
                                <Auth />
                            </Route>
                            <Route exact path="/register">
                                <Auth />
                            </Route>
                            <Route exact path="/user-profile">
                                <UserProfile />
                            </Route>
                            <Route>
                                <Error />
                            </Route>
                        </Switch>
                    </Container>
                    <Footer />
                </div>
            </ThemeProvider>
        </Router>
    );
};

export default App;
