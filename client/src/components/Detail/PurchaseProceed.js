import React from 'react'
import useStyles from './styles'
import { Grid, TextField, Typography, Container, Paper, ButtonBase, Button } from '@material-ui/core'
const PurchaseProceed = () => {
    const classes = useStyles();
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
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="filled-secondary"
                            label="Name"
                            variant="filled"
                            color="secondary"
                        />

                        <TextField
                            id="filled-secondary"
                            label="Email"
                            variant="filled"
                            color="secondary"
                        />

                        <TextField
                            id="filled-secondary"
                            label="Phone"
                            variant="filled"
                            color="secondary"
                        />

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

                    <Button className={classes.proceedButton} variant="outlined" color="primary">
                        Proceed Via SMS
                    </Button>

                    <Button className={classes.proceedButton} variant="outlined" color="primary">
                        Proceed Via Email
                    </Button>

                </Grid>

            </Grid>
        </Container>
    )
}

export default PurchaseProceed;
