import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
const Home = () => {
    const classes = useStyles();
    return (
        <Typography className={classes.title} variant="h1">
            Home Page
        </Typography>
    );
};

export default Home;
