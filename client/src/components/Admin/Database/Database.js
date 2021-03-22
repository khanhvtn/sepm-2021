import React from 'react';
import useStyles from './styles'
import VouchersHandle from './Vouchers/VouchersHandle';
import OrdersHandle from './Orders/OrdersHandle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

const Database = () => {
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
                                Database
                                </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <BrowserRouter basename="/admin">
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
                                <Tab value="/orders" textColor="inherit" label="Orders" component={Link} to="/orders" />
                                <Tab value="/vouchers" textColor="inherit" label="Vouchers" component={Link} to="/vouchers" />
                            </Tabs>
                        </AppBar>
                    )}
                />
                <Switch>
                    <Route path="/orders" component={OrdersHandle} />
                    <Route path="/vouchers" component={VouchersHandle} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Database;