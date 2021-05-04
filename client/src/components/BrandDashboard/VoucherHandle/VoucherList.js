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
import { deleteVoucher, getVouchers } from '../../../actions/vouchers';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const VoucherList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const vouchers = useSelector((state) => state.vouchers);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const brand = useSelector((state) => state.auth)

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleDeleteVoucher = (id) => {
        dispatch(deleteVoucher(id));
        handleCloseDeleteDialog();
    }

    useEffect(() => {
        dispatch(getVouchers());
        console.log(brand)
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
                                {vouchers.allVouchers.map((voucher) => (
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
                                            <Button color="secondary">Update</Button>

                                            <Button color="secondary" onClick={handleOpenDeleteDialog}>Delete</Button>

                                        </TableCell>

                                        <Dialog
                                            open={openDeleteDialog}
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
                                                <Button onClick={(e) => handleDeleteVoucher(voucher._id)} color="primary" autoFocus>
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