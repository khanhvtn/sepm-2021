import { Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles'


const BrandHomeDashboard = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                <Typography variant="h2" color="textSecondary">
                    Welcome to the Brand Dashboard
                </Typography>
            </div>
        </>
    );
}

export default BrandHomeDashboard;
