import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Vouchers from './components/Vouchers/Vouchers';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getVouchers } from './actions/vouchers';
import Navbar from './components/Navbar/Navbar';

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
        <ThemeProvider theme={theme}>
            <div className={classes.grow}>
                <Container maxWidth disableGutters={true}>
                    <Navbar />
                    <Grow in>
                        <Container>
                            <Grid
                                className={classes.mainContainer}
                                container
                                justify="space-between"
                                alignItems="stretch"
                                spacing={3}
                            >
                                <Grid item xs={12} sm={12} md={8}>
                                    <Vouchers setCurrentId={setCurrentId} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Form
                                        currentId={currentId}
                                        setCurrentId={setCurrentId}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
