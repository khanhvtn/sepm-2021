import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import UsersHandle from './Users/UsersHandle'
import BrandsHandle from './Brands/BrandsHandle'
import useStyles from './styles';




const Authentication = () => {
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
                                Authentication
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
                                <Tab value="/users" textColor="inherit" label="Users" component={Link} to="/users" />
                                <Tab value="/brands" textColor="inherit" label="Brands" component={Link} to="/brands" />
                            </Tabs>
                        </AppBar>
                    )}
                />
                <Switch>
                    <Route path="/users" component={UsersHandle} />
                    <Route path="/brands" component={BrandsHandle} />
                </Switch>
            </BrowserRouter>
        </>
    );
}


export default Authentication;