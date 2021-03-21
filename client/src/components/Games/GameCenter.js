import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
const GameCenter = () => {
    const classes = useStyles();
    return (
        <Typography to="/game-center/memorai" component={Link}>
            Memorai Game
        </Typography>
    );
};

export default GameCenter;
