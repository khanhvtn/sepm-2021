import useStyles from './styles';
import { CardActions, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router-dom'
import React from 'react';
import moment from 'moment';

const VoucherItem = ({ voucher }) => {
    const classes = useStyles();
    const history = useHistory();
    const handleGoToDetail = (voucher) => {
        history.push({
            pathname: `/detail/${voucher._id}`,
            state: { voucher: voucher }
        })
    }

    const handleGoToBrandDetail = (id) => {
        history.push({
            pathname: `/brand-home/${id}`
           
        })
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return (
        <>
            { !voucher ?
                <Typography>Loading Error</Typography>
                :
                <Card className={classes.root} onClick={() => handleGoToDetail(voucher)}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                            <Link onClick={() => handleGoToBrandDetail(voucher.creator)}>
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
                                Pay for {formatter.format(voucher.price)} to get {voucher.percentage}% discount
                        </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                {voucher.description}
                            </Typography>
                            <Typography className={classes.textDescription} variant="subtitle2" color="textSecondary">
                                Start Date: {moment(voucher.startedDate).format('LL')}
                            </Typography>
                            <Typography className={classes.textDescription} variant="subtitle2" color="textSecondary">
                                End Date: {moment(voucher.expiredDate).format('LL')}
                            </Typography>
                        </CardContent>

                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={voucher.image}
                        title="Live from space album cover"
                    />
                </Card>
            }
        </>
    );
};

export default VoucherItem;