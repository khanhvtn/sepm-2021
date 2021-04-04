import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { CardActions, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CountDownTimeClock from './CountDownTimeClock'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';



const Detail = () => {
    const classes = useStyles();
    const authData = useSelector(state => state.auth.authData)
    const [user, setUser] = useState(authData)
    const [openDialog, setOpenDialog] = useState(false);
    const history = useHistory();

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleClickCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleGoToProceed = () => {
        history.push('/proceed')
    }

    useEffect(() => {
        setUser(authData)
    }, [authData])
    return (
        <>
            <Card className={classes.root}>
                <div className={classes.detailWithMedia}>
                    <CardActions className={classes.brand}>
                        <Link href="/brand">
                            <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                        </Link>
                        <Typography className={classes.title} component="h6" variant="h6">
                            Sumo BBQ
                        </Typography>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} component="h5" variant="h5">
                            Easter Hunt Day 4 Giveaway
                    </Typography>
                    </CardContent>
                    <CardContent className={classes.desc}>
                        <Typography variant="body1" className={classes.voucherDesc}>
                            Enter today's give away to earn $100 SumoBBQ Voucher
                    </Typography>

                        <Typography variant="h5" component="h5" className={classes.voucherDesc1}>
                            Closes in:
                    </Typography>

                        <CountDownTimeClock />
                    </CardContent>



                    <div className={classes.controls}>
                        {user ?
                            <Button className={classes.getButton} variant="outlined" color="primary" onClick={handleGoToProceed}>
                                Get Now
                            </Button>
                            : 
                            
                            <>
                            <Button className={classes.getButton} variant="outlined" color="primary" onClick={handleClickOpenDialog}>
                                Get Now
                            </Button>
                            <Dialog
                                open={openDialog}
                                onClose={handleClickCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You are required to login to get this voucher!
                            </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickCloseDialog} color="primary">
                                        Close
                             </Button>
                                    <Button onClick={handleClickCloseDialog} color="primary" autoFocus>
                                        <Link href="/login">Login</Link>
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            </>
                        }
      





                    </div>

                    <CardContent className={classes.desc}>
                        <Typography variant="body2" className={classes.voucherDesc}>
                            Start Date: 03/04/2021 1:00:00PM
                    </Typography>
                        <Typography variant="body2" className={classes.voucherDesc}>
                            End Date: 03/04/2021 1:00:00PM
                    </Typography>
                    </CardContent>


                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://source.unsplash.com/featured/?macbook"
                    title="Live from space album cover"
                />
            </Card>
        </>
    )
}

export default Detail;
