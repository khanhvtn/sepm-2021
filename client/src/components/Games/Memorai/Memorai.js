import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import Game from './Game/Game';
import './scss/main.scss';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
const Memorai = () => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div>
            <Button
                className="btn-again"
                variant="text"
                size="large"
                color="default"
                startIcon={<ArrowBack />}
                onClick={() => history.push('/game-center')}
            >
                Back To Game Center
            </Button>
            <Game />
        </div>
    );
};

export default Memorai;
