import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import Banner from '../../Banner/Banner'
import BrandDiscountTag from '../BrandDiscountTag/BrandDiscountTag'
import BrandBundle from '../BrandBundle/BrandBundle'
import { getBrand } from '../../../actions/brands'
import { getVouchers } from '../../../actions/vouchers'

import {
    Typography, Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
const Home = () => {
    const dispatch = useDispatch();
    const brandInfo = useSelector((state) => state.brands.brand);
    const vouchers = useSelector((state) => state.vouchers.allVouchers)

    const params = useParams();
    const classes = useStyles();
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        dispatch(getBrand(params.id));
        dispatch(getVouchers());

    }, [dispatch])


    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return brandInfo == null ? (
        <Typography>No Info Available</Typography>
    ) : (
        <>
            <Banner isBannerStatus={false} brandInfo={brandInfo} />

            <Grid item xs={12} md={12} className={classes.brandDiscountTagSection}>
                <Typography className={classes.suggested} variant="h5">
                    Current
                
                </Typography>
                {vouchers.length !== 0 ?
                    <Grid container justify="center" spacing={2}>
                        {vouchers.filter((voucher) => voucher.creator === brandInfo._id && voucher.isAvailable === true && voucher.isActive === true && new Date(voucher.expiredDate).getTime() >= Date.now() && new Date(voucher.startedDate).getTime() <= Date.now()).map((voucher) => (
                            <Grid xs={12} sm={6} md={3} lg={3} xl={3} key={voucher._id} item justify="flex-start">
                                <BrandDiscountTag voucher={voucher} />
                            </Grid>
                        ))}
                    </Grid>
                    : <Typography>No vouchers for this brand</Typography>}

            </Grid>


            {/* <Grid item xs={12} md={12} className={classes.brandDiscountTagSection}>
                <Grid container justify="center" spacing={2}>
                    {[0, 1, 2].map((value) => (
                        <Grid xs={12} sm={6} md={4} lg={4} xl={4} key={value} item>
                            <BrandBundle />
                        </Grid>
                    ))}
                </Grid>
            </Grid> */}
        </>
    )
};

export default Home;
