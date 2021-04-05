import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles'
import { Grid, TextField, Typography, Container, Paper, ButtonBase, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const PurchaseProceed = () => {
    const classes = useStyles();
    const authData = useSelector(state => state.auth.authData)
    const [user, setUser] = useState(authData)
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog1, setOpenDialog1] = useState(false);

    //Transaction Information Taken From User Data
    const [name, setName] = useState(user.result.name);
    const [email, setEmail] = useState(user.result.email);
    const [phone, setPhone] = useState(user.result.phone);


    useEffect(() => {
        setUser(authData)
    }, [authData])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const transactionDetail = {
            "name": name,
            "phone": phone,
            "email": email
        }
        console.log(transactionDetail)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleOpenDialog1 = () => {
        setOpenDialog1(true)
    }

    const handleCloseDialog1 = () => {
        setOpenDialog1(false)
    }

    return (
        <Container component="main" className={classes.checkout}>
            <Typography variant="h5" className={classes.checkoutTitle}>Checkout</Typography>
            <Grid
                className={classes.root1}
                container
                alignItems="center"
                direction="row"
                spacing={3}
            >

                <Grid xs={12} sm={6} md={6} lg={6} xl={6} className={classes.paper} >
                    <Paper className={classes.paper1}>
                        <Typography variant="h5" color="secondary">Transaction Information</Typography>
                        <Typography variant="body1" color="secondary">Make sure this information is provided correctly</Typography>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                            <TextField
                                id="filled-secondary"
                                label="Name"
                                variant="filled"
                                color="secondary"
                                onChange = {e => setName(e.target.value)}
                            />

                            <TextField
                                id="filled-secondary"
                                label="Email"
                                variant="filled"
                                color="secondary"
                                onChange = {e => setEmail(e.target.value)}

                            />

                            <TextField
                                id="filled-secondary"
                                label="Phone"
                                variant="filled"
                                color="secondary"
                                onChange = {e => setPhone(e.target.value)}

                            />

                            <Button className={classes.proceedButton} variant="outlined" color="primary" onClick={handleOpenDialog} >
                                Proceed Via SMS
                            </Button>

                            <Button className={classes.proceedButton} variant="outlined" color="primary" onClick={handleOpenDialog1}>
                                Proceed Via Email
                            </Button>

                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >

                                <>
                                    <DialogTitle id="alert-dialog-title">{"Proceed Via SMS"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Voucher code will be sent via this mobile phone: {user.result.mobile}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Return
                                        </Button>
                                        <Button onClick={handleOnSubmit} color="primary" autoFocus >
                                            Proceed
                                        </Button>
                                    </DialogActions>

                                </>


                            </Dialog>


                            <Dialog
                                open={openDialog1}
                                onClose={handleCloseDialog1}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >

                                <>
                                    <DialogTitle id="alert-dialog-title">{"Proceed Via Email"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Voucher code will be sent via this Email: {user.result.email}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog1} color="primary">
                                            Return
                                        </Button>
                                        <Button onClick={handleOnSubmit} color="primary" autoFocus >
                                            Proceed
                                        </Button>
                                    </DialogActions>

                                </>


                            </Dialog>



                        </form>

                    </Paper>


                </Grid>

                <Grid xs={12} sm={6} md={6} lg={6} xl={6} className={classes.paper}  >
                    <Paper className={classes.paper1} >
                        <Grid container>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} src="https://source.unsplash.com/featured/?macbook"
                                        title="Live from space album cover" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5">
                                            Sumo BBQ
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            50% OFF from 13:00PM
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>



                </Grid>

            </Grid>
        </Container>
    )
}

export default PurchaseProceed;
