import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { CardActions, Typography, Link, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import { accessLink } from '../../../actions/links';
import CountDownTimeClock from '../../Detail/CountDownTimeClock';
import { checkCurrentUser } from '../../../actions/auths';



const PublishVoucherDetail = () => {
    const classes = useStyles();
    const { auth } = useSelector(state => state)
    const [openDialog, setOpenDialog] = useState(false);
    const history = useHistory();

    // For access link
    const dispatch = useDispatch();
    const linkId = useParams()
    const { links } = useSelector((state) => state)
    const { voucher } = useSelector((state) => state.links.publishVoucher)

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleClickCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleGoToProceed = () => {
        history.push({
            pathname: `/proceed/${voucher._id}`,
            state: { voucher: voucher }
        })
    }

    useEffect(() => {
        dispatch(checkCurrentUser(history))
    }, []);

    useEffect(() => {
        // For access link
        if (!auth.isUserChecking)
            dispatch(accessLink(linkId.id, auth.authData.result._id))
    }, [auth.isUserChecking])

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <>
            { links.isLoading ?
                <div align="center">
                    <CircularProgress color="secondary" />
                </div>
                :
                links.publishVoucher.expiredLink ?
                    <div align="center">
                        <Typography variant="h1"> Page not found! </Typography>
                    </div>
                    :
                    links.publishVoucher.voucher &&
                    <>
                        <Card className={classes.root}>
                            <div className={classes.detailWithMedia}>
                                <CardActions className={classes.branding}>
                                    <Link href="#">
                                        <Typography>{links.publishVoucher.voucher.brand}</Typography>
                                    </Link>
                                </CardActions>
                                <CardContent className={classes.content}>
                                    <Typography className={classes.title} component="h5" variant="h5">
                                        {links.publishVoucher.voucher.title}

                                    </Typography>
                                </CardContent>
                                <CardContent className={classes.content}>
                                    <Typography className={classes.title} component="h6" variant="h6">
                                        {links.publishVoucher.voucher.description}

                                    </Typography>
                                </CardContent>
                                <CardContent className={classes.desc}>
                                    <Typography variant="body1" className={classes.voucherDesc}>
                                        Pay for {formatter.format(links.publishVoucher.voucher.price)}$ to get {links.publishVoucher.voucher.percentage}% discount
                                </Typography>

                                    <Typography variant="h5" component="h5" className={classes.voucherDesc1}>
                                        Closes in:
                                </Typography>

                                    <CountDownTimeClock time={links.publishVoucher.voucher.expiredDate} />
                                </CardContent>



                                <div className={classes.controls}>
                                    {auth.authData ?
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
                                        Start Date: {links.publishVoucher.voucher.startedDate}
                                    </Typography>
                                    <Typography variant="body2" className={classes.voucherDesc}>
                                        End Date: {links.publishVoucher.voucher.expiredDate}
                                    </Typography>
                                </CardContent>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image={links.publishVoucher.voucher.image}
                                title={links.publishVoucher.voucher.title}
                            />
                        </Card>
                    </>
            }
        </>
    )
}

export default PublishVoucherDetail;
