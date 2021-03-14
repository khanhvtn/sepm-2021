import React from 'react';
import { Grid, Typography, ButtonBase, Paper, Button } from '@material-ui/core';

import { Delete, Edit } from '@material-ui/icons';

import useStyles from './styles';

import { useDispatch } from 'react-redux';
import { deleteVoucher } from '../../../actions/vouchers';
const Voucher = ({ voucher, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        // <Card className={classes.card}>
        //     <CardMedia className={classes.media} image={voucher.image} />
        //     <div className={classes.overlay}>
        //         <Typography variant="h6">{voucher.name}</Typography>
        //         <Typography variant="body2">
        //             {moment(voucher.createdAt).fromNow()}
        //         </Typography>
        //     </div>
        //     <div className={classes.overlay2}>
        //         <Button
        //             style={{ color: 'white' }}
        //             size="small"
        //             onClick={() => {}}
        //         >
        //             <MoreHoriz fontSize="default" />
        //         </Button>
        //     </div>
        //     <div className={classes.details}>
        //         <Typography variant="body2" color="textSecondary">
        //             abc
        //         </Typography>
        //     </div>
        //     <CardContent>
        //         <Typography className={classes.title} variant="h5" gutterBottom>
        //             {voucher.description}
        //         </Typography>
        //     </CardContent>
        //     <CardActions className={classes.cardActions}>
        //         <Button size="small" color="primary" onClick={() => {}}>
        //             Buy
        //         </Button>
        //     </CardActions>
        // </Card>
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid
                    item
                    container
                    xs={12}
                    sm={4}
                    justify="center"
                    alignItems="center"
                >
                    <ButtonBase className={classes.image}>
                        <img
                            className={classes.img}
                            alt="complex"
                            src={voucher.image}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={8} container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6">
                                Title: {voucher.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Desciption: {voucher.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Brand: {voucher.brand}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Category: {voucher.category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Discount: {voucher.percentage}%
                            </Typography>
                        </Grid>
                        <Grid item container justify="flex-end">
                            <Button
                                size="medium"
                                variant="contained"
                                color="secondary"
                                startIcon={<Delete />}
                                onClick={() =>
                                    dispatch(deleteVoucher(voucher._id))
                                }
                            >
                                Remove
                            </Button>
                            <Button
                                onClick={() => setCurrentId(voucher._id)}
                                style={{ marginLeft: 10 }}
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            ${voucher.price}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Voucher;
