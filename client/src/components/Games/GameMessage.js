import React from "react";
import { useSelector } from "react-redux";
import { Typography, CircularProgress, Zoom } from "@material-ui/core";

const GameMessage = ({ isWin, isLostGame }) => {
    const { error, auth } = useSelector((state) => ({
        auth: state.auth,
        error: state.error.errors
    }))
    return (
        isLostGame ? (<Zoom
            in
            style={{
                transitionDelay: '500ms',
            }}
        >
            <Typography variant="h5" color="secondary">
                You lost the game
            </Typography>
        </Zoom>) : !isWin ? (
            ''
        ) : auth.isLoading ? (
            <CircularProgress />
        ) : error?.redeem ? (
            <Zoom
                in
                style={{
                    transitionDelay: '500ms',
                }}
            >
                <Typography variant="h5" color="secondary">
                    {error.message}
                </Typography>
            </Zoom>
        ) : (
            <Zoom
                in
                style={{
                    transitionDelay: '500ms',
                }}
            >
                <Typography variant="h5">
                    Congratulation! You won the game and got 500 points
                </Typography>
            </Zoom>
        )
    )
}
export default GameMessage;