import React from 'react';
import Voucher from './Voucher/Voucher';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
const Vouchers = ({ setCurrentId }) => {
    const classes = useStyles();
    const vouchers = useSelector((state) => state.vouchers);
    console.log(vouchers);

    return !vouchers.length ? (
        <Grid container direction="column" alignItems="stretch">
            <Grid item style={{ textAlign: 'center' }}>
                <CircularProgress variant="indeterminate" />
            </Grid>
        </Grid>
    ) : (
        <Grid
            className={classes.container}
            container
            alignItems="stretch"
            direction="column"
            spacing={3}
        >
            {vouchers.map((voucher, index) => (
                <Grid key={index} item>
                    <Voucher voucher={voucher} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Vouchers;
