import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { CardActions, Typography, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom'

const BrandDiscountTag = ({ voucher }) => {
    const classes = useStyles();

    const history = useHistory();
    const handleGoToDetail = (voucher) => {
        history.push({
            pathname: `/detail/${voucher._id}`,
            state: { voucher: voucher }
        })
    }


    return (
        <>
            { !voucher ?
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                            <Chip label="Online" className={classes.chip} />
                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} component="h5" variant="h5">
                                Offer
                        </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="h6" color="h6">
                                15% Student Discount
                        </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <Button size="large" className={classes.getButton} variant="outlined" color="primary">
                                Get now
                        </Button>
                        </div>
                    </div>

                </Card>
                :
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                            <Chip label="Online" className={classes.chip} />

                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} component="h5" variant="h5">
                                {voucher.title}
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                {voucher.description}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <Button size="large" className={classes.getButton} onClick={() => handleGoToDetail(voucher)} variant="outlined" color="primary">
                                Get now
                        </Button>
                        </div>
                    </div>

                </Card>
            }

        </>
    )
}

export default BrandDiscountTag;
