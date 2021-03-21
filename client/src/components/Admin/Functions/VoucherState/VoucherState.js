import React from 'react';
import useStyles from './styles'

const VoucherState = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                This place is for accept/decline voucher
            </div>
        </>
    )
}

export default VoucherState;