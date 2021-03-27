import React from 'react';
import {
    Grid,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Container,
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import MemoraiPhoto from '../../images/memorai/game_screenshot.png';
import RPSPhoto from './RPS/images/rock-paper-scissors.png';
const GameCenter = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Container>
            <Grid container direction="column" alignItems="flex-start">
                <Grid xs={12} item className={classes.gridBtnHome}>
                    <Button
                        className="btn-again"
                        variant="text"
                        size="large"
                        color="default"
                        startIcon={<ArrowBack />}
                        onClick={() => history.push('/')}
                    >
                        Back To Home
                    </Button>
                </Grid>
                <Grid xs={12} item container wrap="wrap" spacing={3}>
                    {/* Memorai Game */}
                    <Grid item>
                        <Card className={classes.root}>
                            <CardHeader
                                title="Memorai"
                                className={classes.cardHeader}
                            />
                            <CardMedia
                                className={classes.media}
                                image={MemoraiPhoto}
                                title="Memorai"
                            />
                            <CardActions>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        history.push('/game-center/memorai')
                                    }
                                    className={classes.btnPlay}
                                >
                                    Play
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    {/* RPS Game */}
                    <Grid item>
                        <Card className={classes.root}>
                            <CardHeader
                                title="Rock paper scissors"
                                className={classes.cardHeader}
                            />
                            <CardMedia
                                className={classes.media}
                                image={RPSPhoto}
                                title="Rock paper scissors"
                            />
                            <CardActions>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        history.push('/game-center/rps-game')
                                    }
                                    className={classes.btnPlay}
                                >
                                    Play
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default GameCenter;
