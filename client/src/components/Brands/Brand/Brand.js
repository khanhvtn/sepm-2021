import React from 'react';
import useStyles from './styles';
import { CardActions, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteBrand } from '../../../actions/brands';
import { useHistory } from 'react-router-dom'


const Brand = ({ voucher }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
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
                            <Link to="/brand">
                                <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                            </Link>
                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} component="h5" variant="h5">
                                Student now get 6% free month
                        </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <Button className={classes.getButton} variant="outlined" color="primary">
                                Get now
                            </Button>
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image="https://source.unsplash.com/featured/?macbook"
                        title="Live from space album cover"
                    />
                </Card>
                :
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                           <Typography className={classes.brandName}>{voucher.brand}</Typography>
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
                            <Button className={classes.getButton} onClick={() => handleGoToDetail(voucher)} variant="outlined" color="primary">
                                Get now
                            </Button>
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={voucher.image}
                        title={voucher.title}
                    />
                </Card>
            }
        </>
    );
};

export default Brand;