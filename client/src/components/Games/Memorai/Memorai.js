import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import Game from './Game/Game';
import './scss/main.scss';
const Memorai = () => {
    const classes = useStyles();
    return <Game />;
};

export default Memorai;
