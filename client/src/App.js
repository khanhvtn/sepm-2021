import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getVouchers } from './actions/vouchers';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Footer from './components/Footer/Footer';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
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
                        disableGutters={true}
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
