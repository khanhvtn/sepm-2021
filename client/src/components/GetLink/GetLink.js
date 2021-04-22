import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Carousel from 'react-material-ui-carousel';
import Banner from '../Banner/Banner';
import { Typography, Link, Grid } from '@material-ui/core';
import Brand from '../Brands/Brand/Brand';


const GetLink = () => {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.vouchers} variant="h1">
                Public Voucher
                <Link className={classes.viewAll} to="#" color="inherit">
                    View all &gt;
                </Link>
            </Typography>

            <Grid item xs={12} md={12}>
                <Grid container justify="center" spacing={3}>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <Grid
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                            key={value}
                            item
                        >
                            <Brand />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default GetLink;
