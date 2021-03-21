import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Banner from '../../Banner/Banner'
import BrandDiscountTag from '../BrandDiscountTag/BrandDiscountTag'
import BrandBundle from '../BrandBundle/BrandBundle'

import {
    Typography, Link, Grid
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

            <Grid item xs={12} md={12} className={classes.brandDiscountTagSection}>
                <Typography className={classes.suggested} variant="h5">
                    Current
                <Link className={classes.viewAll} href="#" color="inherit">
                        View all &gt;
                </Link>
                </Typography>
                <Grid container justify="center" spacing={2}>
                    {[0, 1, 2, 3].map((value) => (
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} key={value} item>
                            <BrandDiscountTag />
                        </Grid>
                    ))}
                </Grid>
            </Grid>


            <Grid item xs={12} md={12} className={classes.brandDiscountTagSection}>
                <Grid container justify="center" spacing={2}>
                    {[0, 1, 2].map((value) => (
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4} key={value} item>
                            <BrandBundle />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
};

export default Home;
