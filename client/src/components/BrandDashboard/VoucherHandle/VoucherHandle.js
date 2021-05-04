import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FileBase from 'react-file-base64';

import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { createVoucher, updateVoucher } from '../../../actions/vouchers';
import VoucherList from './VoucherList';


const initialVoucherData = {
    title: '',
    description: '',
    brand: '',
    category: '',
    image: '',
    creator: '',
    price: '0',
    percentage: '0',
    startedDate: new Date(),
    expiredDate: new Date(),
}

const VoucherHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [voucherData, setVoucherData] = useState(initialVoucherData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const brandInfo = useSelector((state) => state.auth.brandData.result)

    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        setVoucherData({...voucherData, brand: brandInfo.name, creator: brandInfo._id})
    }, [dispatch]);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleVoucherSubmit = (e) => {
        e.preventDefault();
        dispatch(createVoucher(voucherData))
        clearField();
        handleCloseDialog();
    }

    const clearField = () => {
        setVoucherData(initialVoucherData)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDeleteBrand = (id) => {
        setAnchorEl(null)
    }

    return (
        <>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                position="static"
                elevation={0}
                color="default"
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                Voucher
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.main}>
                <Button variant="contained" color="primary" onClick={handleClickOpenDialog}>NEW</Button>
                <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Voucher</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a voucher, you need to enter all voucher information. After submitting, our administrators will verify your vouchers. Good luck!
          </DialogContentText>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                value={voucherData.title}
                                onChange={(e) => setVoucherData({ ...voucherData, title: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                value={voucherData.description}
                                onChange={(e) => setVoucherData({ ...voucherData, description: e.target.value })}

                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="category"
                                label="Category"
                                type="text"
                                value={voucherData.category}
                                onChange={(e) => setVoucherData({ ...voucherData, category: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                label="Price in VND"
                                type="number"
                                value={voucherData.price}
                                onChange={(e) => setVoucherData({ ...voucherData, price: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="percentage"
                                inputProps={{
                                    min: 0,
                                    max: 100,
                                }}
                                label="Discount Percentage"
                                type="number"
                                value={voucherData.percentage}
                                onChange={(e) => setVoucherData({ ...voucherData, percentage: e.target.value })}
                                fullWidth
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid justify="space-around">
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
                                        style={{ marginLeft: 10 }}
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
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setVoucherData({ ...voucherData, image: base64 })
                                }
                            />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleVoucherSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                
                <VoucherList/>
            </div>
        </>
    )
}

export default VoucherHandle;