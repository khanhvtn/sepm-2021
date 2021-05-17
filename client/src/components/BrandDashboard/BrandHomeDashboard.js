import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getHistories } from '../../actions/histories'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'

const state = {
    labels: [],
    datasets: [
        {
            label: 'Order',
            backgroundColor: '#e24378',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
            barPercentage: 1
            
        }
    ]
}


const BrandHomeDashboard = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { histories } = useSelector((state) => state.histories)
    const [ownHistories, setOwnHistories] = useState([]);
    const [chart, setChart] = useState(state);

    const brandInfo = useSelector((state) => state.auth.brandData.result)

    const sortObject = (myObj) => {
        const sort = Object.keys(myObj)
            .sort((a, b) => myObj[b] - myObj[a])
            .reduce(
                (_sortedObj, key) => ({
                    ..._sortedObj,
                    [key]: myObj[key]
                }),
                {}
            );

            return sort;
    }


    useEffect(() => {
        dispatch(getHistories())
    }, [dispatch])

    useEffect(() => {
        if(chart.labels.length > 0) {
            chart.labels = []
        }

        if(chart.datasets[0].data.length > 0) {
            chart.datasets[0].data = []

        }
        const ownHistory = histories.filter((history) => history.voucher.creator === brandInfo._id);
        var result = ownHistory.reduce((acc, o) => (acc[o.voucher.title] = (acc[o.voucher.title] || 0) + 1, acc), {});
        var sort = sortObject(result)
        Object.keys(sort)
            .forEach(function eachKey(key) {
                chart.labels.push(key)
                chart.datasets[0].data.push(sort[key])
            });
    }, [histories.length])

    const isToday = (someDate) => {
        const today = new Date()
        return new Date(someDate).getDate() == today.getDate() &&
            new Date(someDate).getMonth() == today.getMonth() &&
            new Date(someDate).getFullYear() == today.getFullYear()
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',


    });



    return histories.isLoading ?
        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
            <Grid item style={{ textAlign: 'center' }}>
                <CircularProgress variant="indeterminate" />
            </Grid>
        </Grid>
        : histories.length === 0 ? <Typography className={classes.contentWrapper}>No Data</Typography> : (
            <>
                <div className={classes.main}>
                    <Typography variant="h2" color="textSecondary" className={classes.titlePage}>
                        Overview
                </Typography>


                    <Grid container spacing={3} className={classes.mainGrid}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <AssessmentIcon />
                                <Typography>Revenue</Typography>
                                <Typography> {formatter.format(histories.filter((history) => history.voucher.creator === brandInfo._id && isToday(history.date))
                                    .map((history) => parseFloat(history.voucher.price)).reduce((total, current) => total = total + current, 0)
                                )}</Typography>
                                <Typography> {moment(Date.now()).format('LL')}</Typography>


                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <ShoppingCartIcon />
                                <Typography>Order</Typography>
                                <Typography>{histories.filter((history) => history.voucher.creator === brandInfo._id && isToday(history.date)).length}</Typography>
                                <Typography> {moment(Date.now()).format('LL')}</Typography>


                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper1}>
                                <Typography>Best Selling Vouchers</Typography>

                                <Bar
                                    data={state}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Average Rainfall per month',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                            </Paper>
                        </Grid>

                    </Grid>

                </div>
            </>
        );
}

export default BrandHomeDashboard;
