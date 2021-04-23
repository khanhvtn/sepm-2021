import useStyles from './styles';
import { CardActions, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react';
import GetLinkDialog from '../GetLinkDialog/GetLinkDialog';

const PublishVoucher = ({ voucher }) => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <GetLinkDialog handleClose={handleClose} open={open} />
            <Card className={classes.root} onClick={() => handleClickOpen(voucher)}>
                <div className={classes.details}>
                    <CardActions className={classes.branding}>
                        <Link href="/brand">
                            <Typography>{voucher.brand}</Typography>
                        </Link>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} component="h5" variant="h5">
                            {voucher.title}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title}>
                            Category: {voucher.category}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.content}>
                        <Typography className={classes.price} component="h5" variant="h5">
                            Pay for {voucher.price}$ to get {voucher.percentage}% discount
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.description}>
                        <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                            {voucher.description}
                        </Typography>
                        <Typography className={classes.textDescription} variant="subtitle2" color="textSecondary">
                            Start Date: {voucher.startedDate}
                        </Typography>
                        <Typography className={classes.textDescription} variant="subtitle2" color="textSecondary">
                            Start Date: {voucher.expiredDate}
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={voucher.image}
                    title="Live from space album cover"
                />
            </Card>
        </>
    );
};

export default PublishVoucher;