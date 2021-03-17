import React from 'react'
import useStyles from './styles';
import { CardActions, Typography, Link, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const BrandDiscountTag = ({ brand }) => {
    const classes = useStyles();
    return (
        <>
            { !brand ?
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
                                {brand.title}
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                {brand.description}
                            </Typography>
                        </CardContent>
                    </div>

                </Card>
            }

        </>
    )
}

export default BrandDiscountTag;
