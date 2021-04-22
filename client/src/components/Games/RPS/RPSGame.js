import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Footer from './components/Footer';
import '../RPS/css/App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { winGame } from '../../../actions/auths';
import GameMessage from '../GameMessage';

function RPSGame() {
    const [myPick, setMyPick] = useState('');
    const [housePick, setHousePick] = useState('');
    const [gameScore, setGameScore] = useState(0);
    const { userInfo, auth } = useSelector((state) => ({
        userInfo: state.auth.authData?.result,
        auth: state.auth,
        error: state.errors
    }))
    const dispatch = useDispatch();
    const [isWin, setIsWin] = useState(false);

    function newHousePick() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomChoice = choices[Math.floor(Math.random() * 3)];
        setHousePick(randomChoice);
    }

    useEffect(() => {
        newHousePick();
    }, [setMyPick]);

    useEffect(() => {
        if (gameScore === 3) {
            //set win status to true
            setIsWin(true);
            const points = String(parseInt(userInfo.points) + 500);
            //reset score
            const newUpdatedUser = { ...userInfo, points };
            dispatch(winGame(newUpdatedUser))
            setGameScore(0)
        }
    }, [gameScore])

    return (
        <div className="wrapper">
            <Header score={gameScore} />
            <Switch className="main">
                <Route path="/game-center/rps-game/play">
                    <Play
                        mine={myPick}
                        house={housePick}
                        score={gameScore}
                        setScore={setGameScore}
                        setHousePick={newHousePick}
                        setIsWin={setIsWin}
                    />
                </Route>
                <Route path="/game-center/rps-game">
                    <Home setPick={setMyPick} />
                </Route>
            </Switch>
            <GameMessage isWin={isWin} />
            <Footer />
        </div>
    );
}

export default RPSGame;
