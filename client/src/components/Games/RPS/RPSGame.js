import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Footer from './components/Footer';
import '../RPS/css/App.scss';

function RPSGame() {
    const [myPick, setMyPick] = useState('');
    const [housePick, setHousePick] = useState('');
    const [gameScore, setGameScore] = useState(0);

    function newHousePick() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomChoice = choices[Math.floor(Math.random() * 3)];
        setHousePick(randomChoice);
    }

    useEffect(() => {
        newHousePick();
    }, [setMyPick]);

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
                    />
                </Route>
                <Route path="/game-center/rps-game">
                    <Home setPick={setMyPick} />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default RPSGame;
