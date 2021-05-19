import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import cardImages from '../cards';
import Card from '../Card/Card';
import deepcopy from 'deepcopy';
import * as imagrCards from './imageCards';
import { Button, Typography, Zoom, CircularProgress } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { winGame } from '../../../../actions/auths';
import { CLEAR_ERROR } from '../../../../constants/actionTypes';
import GameMessage from '../../GameMessage';
const maximumTimePlay = 60 //60 euqal to 1 minute
let timer

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function generateCards(count) {
    if (count % 2 !== 0)
        throw 'Count must be even: 2, 4, 6, etc. but it is ' + count;

    const cards = shuffleArray(cardImages)
        .slice(0, count / 2)
        .map((imageURL) => ({
            id: uuid(),
            imageURL: imagrCards[imageURL],
            isFlipped: false,
            canFlip: true,
        }))
        .flatMap((e) => [e, { ...deepcopy(e), id: uuid() }]);

    return shuffleArray(cards);
}

export default function Game({ fieldWidth = 6, fieldHeight = 3 }) {
    const totalCards = fieldWidth * fieldHeight;
    const dispatch = useDispatch();
    const { userInfo, auth, error } = useSelector((state) => ({
        userInfo: state.auth.authData?.result,
        auth: state.auth,
        error: state.error.errors,
    }));
    const [cards, setCards] = useState(generateCards(totalCards));
    const [canFlip, setCanFlip] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [isWin, setIsWin] = useState(false);
    const [timerPlay, setTimerPlay] = useState(maximumTimePlay);
    const [isLostGame, setIsLostGame] = useState(false);

    function setCardIsFlipped(cardID, isFlipped) {
        setCards((prev) =>
            prev.map((c) => {
                if (c.id !== cardID) return c;
                return { ...c, isFlipped };
            })
        );
    }
    function setCardCanFlip(cardID, canFlip) {
        setCards((prev) =>
            prev.map((c) => {
                if (c.id !== cardID) return c;
                return { ...c, canFlip };
            })
        );
    }

    // showcase
    useEffect(() => {
        if (isWin || isLostGame) return;
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(
                    () => setCardIsFlipped(card.id, true),
                    index++ * 100
                );
            }
            setTimeout(() => setCanFlip(true), cards.length * 100);
        }, 3000);
        let maxTimePlay = maximumTimePlay;
        timer = setInterval(() => {
            setTimerPlay(--maxTimePlay)
            if (maxTimePlay == 0) {
                clearInterval(timer)
                //set isLostGame
                setIsLostGame(true)
                //set disable flip function for all cards
                for (const card of cards) {
                    setCardCanFlip(card.id, false)
                }
            }
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [isWin, isLostGame]);

    function resetFirstAndSecondCards() {
        setFirstCard(null);
        setSecondCard(null);
    }

    const checkWinGame = () => {
        const isWin = cards.every((card) => card.isFlipped === false);
        if (isWin) {
            clearInterval(timer)
            setIsWin((prevState) => ({ ...prevState, isWin }));
            //calculate points after user win the game
            const points = String(parseInt(userInfo.points) + 500);
            const newUpdatedUser = { ...userInfo, points };
            dispatch(winGame(newUpdatedUser));
        }
    };

    const handlePlayAgagin = () => {
        dispatch({ type: CLEAR_ERROR });
        setCards(() => generateCards(totalCards));
        setIsWin(false);
        setIsLostGame(false)
    };
    function onSuccessGuess() {
        setCardCanFlip(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardIsFlipped(firstCard.id, false);
        setCardIsFlipped(secondCard.id, false);
        resetFirstAndSecondCards();
        checkWinGame();
    }
    function onFailureGuess() {
        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardIsFlipped(firstCardID, true);
        }, 1000);
        setTimeout(() => {
            setCardIsFlipped(secondCardID, true);
        }, 1200);

        resetFirstAndSecondCards();
    }

    useEffect(() => {
        if (!firstCard || !secondCard) return;
        firstCard.imageURL === secondCard.imageURL
            ? onSuccessGuess()
            : onFailureGuess();
    }, [firstCard, secondCard]);

    function onCardClick(card) {
        if (!canFlip) return;
        if (!card.canFlip) return;

        if (
            (firstCard && card.id === firstCard.id) ||
            (secondCard && card.id === secondCard.id)
        )
            return;

        setCardIsFlipped(card.id, false);

        firstCard ? setSecondCard(card) : setFirstCard(card);
    }

    return (
        <div className="game container-md">
            <Typography variant="h3" gutterBottom>
                Memorai
            </Typography>
            <GameMessage isWin={isWin} isLostGame={isLostGame} />
            <Typography variant="h6">Timer: {timerPlay}s</Typography>
            <div className="cards-container">
                {cards.map((card) => (
                    <Card
                        onClick={() => onCardClick(card)}
                        key={card.id}
                        {...card}
                    />
                ))}
            </div>
            {isWin || isLostGame ? (
                <Button
                    onClick={handlePlayAgagin}
                    className="btn-back"
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<Replay />}
                >
                    Play Again
                </Button>
            ) : (
                ''
            )}
        </div>
    );
}
