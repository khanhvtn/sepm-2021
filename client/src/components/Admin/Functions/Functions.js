import React from 'react';
import useStyles from './styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import VoucherState from './VoucherState/VoucherState';
import ShareLink from './ShareLink/ShareLink';

const Functions = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                position="static"
                elevation={0}
                color="default"
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                Functions
                                </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <BrowserRouter basename="/dashboard/admin">
                <Route
                    path="/"
                    render={(history) => (
                        <AppBar
                            component="div"
                            className={classes.secondaryBar}
                            position="static"
                            elevation={0}
                            color="default"
                        >
                            <Tabs
                                value={history.location.pathname}
                                textColor="inherit" TabIndicatorProps={{ style: { background: 'black' } }}>
                                <Tab value="/voucher-state" textColor="inherit" label="Voucher State" component={Link} to="/voucher-state" />
                                <Tab value="/share-link" textColor="inherit" label="Share Link" component={Link} to="/share-link" />
                            </Tabs>
                        </AppBar>
                    )}
                />
                <Switch>
                    <Route path="/voucher-state" component={VoucherState} />
                    <Route path="/share-link" component={ShareLink} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Functions;