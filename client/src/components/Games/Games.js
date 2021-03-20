import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
const Games = () => {
    const classes = useStyles();
    return (
        <Typography to="/list-games/memorai" component={Link}>
            Memorai Game
        </Typography>
    );
};

export default Games;
