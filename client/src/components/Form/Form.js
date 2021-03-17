import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from './styles';
import { createVoucher, updateVoucher } from '../../actions/vouchers';

const initialVoucherData = {
    title: '',
    description: '',
    brand: '',
    category: '',
    image: '',
    price: '0',
    percentage: '0',
    startedDate: new Date(),
    expiredDate: new Date(),
};
const Form = ({ currentId, setCurrentId }) => {
    const [voucherData, setVoucherData] = useState(initialVoucherData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const voucher = useSelector((state) =>
        currentId
            ? state.vouchers.find((voucher) => voucher._id === currentId)
            : null
    );
    const user = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        if (voucher) {
            setVoucherData(voucher);
        }
    }, [voucher]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(
                updateVoucher(currentId, {
                    ...voucherData,
                    name: user?.result?.name,
                })
            );
        } else {
            dispatch(
                createVoucher({ ...voucherData, name: user?.result?.name })
            );
        }
        clear();
    };
    const clear = () => {
        setVoucherData(initialVoucherData);
        if (currentId) {
            setCurrentId(null);
        }
    };
    return (
        <Paper className={classes.paper}>
            <form
                className={`${classes.root} ${classes.form}`}
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? 'Editting' : 'Creating'} a Voucher
                </Typography>
                <TextField
                    fullWidth
                    name="title"
                    variant="outlined"
                    label="Title"
                    value={voucherData.title}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            title: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="description"
                    variant="outlined"
                    label="Description"
                    value={voucherData.description}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            description: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="brand"
                    variant="outlined"
                    label="Brand"
                    value={voucherData.brand}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            brand: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="category"
                    variant="outlined"
                    label="Category"
                    value={voucherData.category}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            category: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    inputProps={{
                        min: 0,
                    }}
                    type="number"
                    name="price"
                    variant="outlined"
                    label="Price"
                    value={voucherData.price}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            price: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    inputProps={{
                        min: 0,
                        max: 100,
                    }}
                    type="number"
                    name="percentage"
                    variant="outlined"
                    label="Percentage"
                    value={voucherData.percentage}
                    onChange={(e) =>
                        setVoucherData({
                            ...voucherData,
                            percentage: e.target.value,
                        })
                    }
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            minDate={new Date()}
                            className={classes.datePicker}
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Started Date"
                            value={voucherData.startedDate}
                            onChange={(startedDate) =>
                                setVoucherData({
                                    ...voucherData,
                                    startedDate,
                                })
                            }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            minDate={new Date()}
                            className={classes.datePicker}
                            margin="normal"
                            id="date-picker-inline"
                            label="Expired Date"
                            format="MM/dd/yyyy"
                            value={voucherData.expiredDate}
                            onChange={(expiredDate) =>
                                setVoucherData({
                                    ...voucherData,
                                    expiredDate,
                                })
                            }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setVoucherData({ ...voucherData, image: base64 })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    fullWidth
                >
                    {currentId ? 'Edit' : 'Create'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
