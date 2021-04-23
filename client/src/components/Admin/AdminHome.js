import { Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles'


const AdminHome = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                <Typography variant="h2" color="textSecondary">
                    Welcome to the Admin Dashboard
                </Typography>
            </div>
        </>
    );
}

export default AdminHome;
