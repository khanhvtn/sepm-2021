import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-material-ui-carousel';
import SimpleBanner from '../Banner/SimpleBanner';
import Brand from '../Brands/Brand/Brand';
import { Alert } from '@material-ui/lab';

import {
    Typography,
    Grid,
    GridList,
    GridListTile,
    Snackbar,
    CircularProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { IS_SUCCESS_BUY} from '../../constants/actionTypes';
import { getVouchers } from '../../actions/vouchers';
import { getBrands } from '../../actions/brands';

const initialState = {
    isAlertSuccess: false
}

const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 768;
    const { auth, vouchers, brands, histories } = useSelector(state => state);
    const [state, setState] = useState(initialState);
    useEffect(() => {
        dispatch(getVouchers())
        dispatch(getBrands())

    }, [dispatch])

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    useEffect(() => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: histories.bought }))
    }, [histories.bought])

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: IS_SUCCESS_BUY, payload: false })
    }

    useEffect(() => {
        console.log(vouchers.allVouchers)
    }, [dispatch])

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return vouchers.isLoading && brands.isLoading ?
        <div className={classes.contentWrapper} align="center">
            <CircularProgress color="secondary" />
        </div> : (
            <>

                {state.isAlertSuccess ?
                    <Snackbar open={state.isAlertSuccess} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Purchase Successful. Your Current Account Balance Is {formatter.format(auth.authData.result.accountBalance)}
                        </Alert>
                    </Snackbar> : ""}
                    <Typography className={classes.suggested} variant="h5">
                    Brand Feature
                
                </Typography>
                <Carousel navButtonsAlwaysInvisible={true}>
                    <Grid container spacing={2}>
                    {brands.brands.map((brand) => (
                        <Grid
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}
                            key={brand}
                            item
                        >    
                            <SimpleBanner brandInfo={brand} />
                        </Grid>
                    ))}
                    </Grid>
                </Carousel>

                <Typography className={classes.suggested} variant="h5">
                    Suggested
                
                </Typography>

                
                    <Grid container justify="flex-start" spacing={2}>
                        {vouchers.allVouchers.filter((voucher) => voucher.isAvailable === true && voucher.isActive === true && new Date(voucher.expiredDate).getTime() >= Date.now() && new Date(voucher.startedDate).getTime() <= Date.now()).map((voucher) => (
                            <Grid
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                xl={4}
                                key={voucher}
                                item
                                
                            >
                                <Brand voucher={voucher} />
                            </Grid>
                        ))}
               
                </Grid>


            </>
        );
};

export default Home;
