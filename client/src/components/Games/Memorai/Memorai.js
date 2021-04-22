import React from 'react';
import { Button } from '@material-ui/core';
import Game from './Game/Game';
import './scss/main.scss';
import { ArrowBack, Dialpad } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLEAR_ERROR } from '../../../constants/actionTypes';

const Memorai = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div>
            <Button
                className="btn-again"
                variant="text"
                size="large"
                color="default"
                startIcon={<ArrowBack />}
                onClick={() => {
                    dispatch({ type: CLEAR_ERROR });
                    history.push('/game-center');
                }}
            >
                Back To Game Center
            </Button>
            <Game />
        </div>
    );
};

export default Memorai;
