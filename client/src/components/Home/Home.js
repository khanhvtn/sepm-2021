import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Carousel from 'react-material-ui-carousel'
import Banner from '../Banner/Banner'
import Brand from '../Brands/Brand/Brand'
import {
    Typography, Link, Grid, GridList, GridListTile 
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
            <Carousel navButtonsAlwaysInvisible={true}>
                {[0, 1, 2].map((value) => {
                        return <Banner key={value} isBanner={true} item />
                })}
            </Carousel>

            <Typography className={classes.suggested} variant="h5">
                Suggested
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

            <Typography className={classes.vouchers} variant="h5">
                Voucher
                <Link className={classes.viewAll} href="#" color="inherit">
                    View all &gt;
                </Link>
            </Typography>

            {width < breakpoint ?
                <GridList className={classes.gridList} cols={1.5} cellHeight="auto" spacing={12}>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <GridListTile className={classes.gridListTile} key={value}>
                            <Brand />
                        </GridListTile>
                    ))}
                </GridList>
                :
                <Grid item xs={12} md={12}>
                    <Grid container justify="center" spacing={2}>
                        {[0, 1, 2, 3 ,4 ,5].map((value) => (
                            <Grid xs={12} sm={4} md={4} lg={4} xl={4} key={value} item>
                                <Brand />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            }

        </>
    )
};

export default Home;
