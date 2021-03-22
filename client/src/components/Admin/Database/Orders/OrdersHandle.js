import React from 'react';
import useStyles from './styles'

const OrdersHandle = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                This place is for orders
            </div>
        </>
    )
}

export default OrdersHandle;