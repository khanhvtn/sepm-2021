import React from 'react';
import useStyles from './styles'

const VouchersHandle = () => {
    const classes = useStyles();

    return(
        <>
            <div className={classes.main}>
                This place is for vouchers
            </div>
        </>
    )
}

export default VouchersHandle;