import React from 'react';
import useStyles from './styles'

const BrandsHandle = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                This place is for brands
            </div>
        </>
    )
}

export default BrandsHandle;