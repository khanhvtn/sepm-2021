import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import { Typography, Link, Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedVoucher } from '../../actions/admins';
import PublishVoucher from './PublishVoucher/PublishVoucher';


const GetLink = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { vouchers } = useSelector((state) => state)

    useEffect(() => {
        dispatch(getPublishedVoucher())
    }, [])

    return (
        <>
            { vouchers.isLoading ?
                <div className={classes.progressWrapper} align="center">
                    <CircularProgress />
                </div>
                :
                vouchers.publishedVouchers.length === 0 ?
                    <div className={classes.contentWrapper}>
                        <Typography variant="h4" color="textSecondary" align="center">
                            No published vouchers for this project yet
                        </Typography>
                    </div>
                    :
                    <>
                        <Typography className={classes.vouchers} variant="h3" align="center">
                            Public Voucher
                        </Typography>
                        <Grid item xs={12} md={12}>
                            <Grid container justify="center" spacing={3}>
                                {vouchers.publishedVouchers.map((voucher) => (
                                    <Grid
                                        xs={12}
                                        sm={4}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        key={voucher}
                                        item
                                    >
                                        <PublishVoucher voucher={voucher} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    );
};

export default GetLink;
