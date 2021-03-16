import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Banner from '../../Banner/Banner'
import Brand from '../Brand/Brand'
import {
    Typography, Button, Link, Grid, GridList, GridListTile 
} from '@material-ui/core';

const Home = () => {

    const classes = useStyles();
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        <>
            <Banner isBanner={false}/>

            <Typography className={classes.suggested} variant="h5">
                Current
                <Link className={classes.viewAll} href="#" color="inherit">
                    View all &gt;
                </Link>
            </Typography>

            <Grid item xs={12} md={12}>
                <Grid container justify="center" spacing={2}>
                    {[0, 1, 2].map((value) => (
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4} key={value} item>
                            <Brand />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
};

export default Home;
