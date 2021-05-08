import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { deleteVoucher, getVouchers, updateVoucher } from '../../../actions/vouchers';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FileBase from 'react-file-base64';

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


const VoucherList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [voucherData, setVoucherData] = useState(initialVoucherData);
    const vouchers = useSelector((state) => state.vouchers);
    const brand = useSelector((state) => state.auth.brandData.result)
    const brandInfo = useSelector((state) => state.auth.brandData.result)
    const [activeDeleteModal, setActiveDeleteModal] = useState(null);
    const [activeUpdateModal, setActiveUpdateModal] = useState(null);
    useEffect(() => {
        setVoucherData({...voucherData, brand: brandInfo.name, creator: brandInfo._id})
    }, [dispatch]);

    const handleOpenDeleteDialog = (e, id) => {
        setActiveDeleteModal(id)
    }

    const handleOpenUpdateDialog = (e, id) => {
        setActiveUpdateModal(id)
    }

    const handleCloseUpdateDialog = () => {
        setActiveUpdateModal(null)
    }

    const handleCloseDeleteDialog = () => {
        setActiveDeleteModal(null)
    }

    const handleDeleteVoucher = (id) => {
        dispatch(deleteVoucher(id));
        handleCloseDeleteDialog();
    }

    const handleVoucherUpdate = (e, id) => {
        e.preventDefault();
        dispatch(updateVoucher(id,voucherData))
        clearField();
        handleCloseUpdateDialog();
    }

    const clearField = () => {
        setVoucherData(initialVoucherData)
    }

    useEffect(() => {
        dispatch(getVouchers());
    }, [dispatch]);
    return vouchers.isLoading ? (
        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
            <Grid item style={{ textAlign: 'center' }}>
                <CircularProgress variant="indeterminate" />
            </Grid>
        </Grid>)
        :
        vouchers.allVouchers.length == 0
            ? (
                <Typography>No Vouchers </Typography>
            )
            : (
                <div>

                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>

                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Percentage</TableCell>
                                    <TableCell align="right">Starting Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vouchers.allVouchers.filter((voucher) => voucher.creator === brand._id).map((voucher) => (
                                    <TableRow key={voucher._id}>
                                        <TableCell scope="row">
                                            <img src={voucher.image} className={classes.rowImage} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {voucher.title}
                                        </TableCell>
                                        <TableCell component="th" align="left" scope="row" className={classes.rowDesc}>
                                            {voucher.description}
                                        </TableCell>
                                        <TableCell align="right">{voucher.category}</TableCell>
                                        <TableCell align="right">{voucher.price}</TableCell>
                                        <TableCell align="right">{voucher.percentage}</TableCell>
                                        <TableCell align="right">{moment(voucher.startedDate).format('LL')}</TableCell>
                                        <TableCell align="right">{moment(voucher.expiredDate).format('LL')}</TableCell>
                                        <TableCell align="right">{voucher.isActive == true ? "Verified" : "Unverifed"}</TableCell>
                                        <TableCell>
                                            <Button color="secondary" onClick={(e) => handleOpenUpdateDialog(e, voucher._id)}>Update</Button>

                                            <Button color="secondary" onClick={(e) => handleOpenDeleteDialog(e, voucher._id)}>Delete</Button>

                                        </TableCell>

                                        <Dialog open={activeUpdateModal === voucher._id} onClose={handleCloseUpdateDialog} aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Update Voucher</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Fill in your updated information for {voucher.title}
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
                                                    <Typography className={classes.voucherInfoUpdate}>{voucher.title}</Typography>
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
                                                    <Typography className={classes.voucherInfoUpdate}>{voucher.description}</Typography>

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
                                                    <Typography className={classes.voucherInfoUpdate}>{voucher.category}</Typography>

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
                                                    <Typography className={classes.voucherInfoUpdate}>{voucher.price}</Typography>

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
                                                    <Typography className={classes.voucherInfoUpdate}>{voucher.percentage}</Typography>


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
                                                            <Typography className={classes.voucherInfoUpdate}>{voucher.startedDate}</Typography>

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
                                                            <Typography className={classes.voucherInfoUpdate}>{voucher.expiredDate}</Typography>

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
                                                <Button onClick={handleCloseUpdateDialog} color="primary">
                                                    Cancel
                        </Button>
                                                <Button onClick={(e) => handleVoucherUpdate(e ,voucher._id)} color="primary">
                                                    Update
                        </Button>
                                            </DialogActions>
                                        </Dialog>




                                        <Dialog
                                            open={activeDeleteModal === voucher._id}
                                            onClose={handleCloseDeleteDialog}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">Delete Voucher</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Are you sure that you want to delete voucher {voucher.title}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseDeleteDialog} color="primary">
                                                    Disagree
                                            </Button>
                                                <Button onClick={(e) => handleDeleteVoucher(e, voucher._id)} color="primary" autoFocus>
                                                    Agree
                                            </Button>
                                            </DialogActions>
                                        </Dialog>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            )
}

export default VoucherList;