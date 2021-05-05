import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getVouchers } from '../../../actions/vouchers';
import { Button, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createCode, deleteCode, getCodes } from '../../../actions/codes';



const initialVoucherCode = {
    code: "",
    voucher: ""
}

const CodeHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const vouchers = useSelector((state) => state.vouchers);
    const codes = useSelector((state) => state.codes);
    const [activeModal, setActiveModal] = useState(null);
    const brandInfo = useSelector((state) => state.auth.brandData.result)
    const [initialBrandInfo, setInitialBrandInfo] = useState([]);
    const [code, setCode] = useState(initialVoucherCode)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getVouchers());
        dispatch(getCodes());
    }, [dispatch]);

    useEffect(() => {
        setInitialBrandInfo(codes)
    }, [dispatch]);

  
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


    const handleDialogOpen = (e, id) => {
        setActiveModal(id)

    };

    const handleDialogClose = () => {
        setActiveModal(null)
    };

    const handleDeleteBrand = (id) => {
        setAnchorEl(null)
    }

    const handleOnCreateCode = () => {
        dispatch(createCode(code))
        clearField();
        handleDialogClose();
        

    }

    const handleDeleteCode = (id) => {
        dispatch(deleteCode(id));
        handleDialogClose();

    }

    const clearField = () => {
        setCode(initialVoucherCode)
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
                                Code
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.main}>
                {vouchers.isLoading ? (
                    <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
                        <Grid item style={{ textAlign: 'center' }}>
                            <CircularProgress variant="indeterminate" />
                        </Grid>
                    </Grid>)
                    :
                    vouchers.allVouchers.length == 0
                        ? (
                            <Typography>No Vouchers</Typography>
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
                                                <TableCell align="right">Available</TableCell>
                                                <TableCell align="right">Action</TableCell>




                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {vouchers.allVouchers.filter((voucher) => voucher.creator === brandInfo._id).map((voucher) => (
                                                <TableRow key={voucher._id} >
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
                                                    <TableCell align="right">{codes.allCodes.length == 0 ? "0" :  Array.isArray(codes.allCodes) ? codes.allCodes.filter((code) => code.voucher === voucher._id && code.isSold == false).length : 
                                                    <CircularProgress/>
                                                    }</TableCell>
                                                    <TableCell align="right">
                                                        <Button color="secondary" onClick={(e) => handleDialogOpen(e, voucher._id)}>ADD CODE</Button>
                                                        <Dialog open={activeModal === voucher._id} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                                                            <DialogTitle id="form-dialog-title">ADD CODE</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Here are a list of codes:
                                                                </DialogContentText>

                                                                <TableContainer component={Paper} className={classes.tableContainer}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell align="left">Code</TableCell>
                                                                            <TableCell align="right">Status</TableCell>
                                                                            <TableCell align="right">Action</TableCell>

                                                                        </TableRow>
                                                                    </TableHead>
                                                                </TableContainer>
                                                                <TableBody>
                                                                    {codes.allCodes.length !== 0 && Array.isArray(codes.allCodes) ? codes.allCodes.filter((code) => code.voucher === voucher._id).map((code) => (
                                                                        <TableRow id={code._id}>
                                                                            <TableCell>
                                                                                {code.code}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {code.status == true ? "Sold" : "Available"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Button color="secondary" onClick={(e) => handleDeleteCode(code._id)} >Remove</Button>

                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )) : (
                                                                        <Typography>No Code Added</Typography>
                                                                    )}
                                                                </TableBody>


                                                                <DialogContentText>
                                                                    Please fill in the field below to create new codes:
                                                                </DialogContentText>

                                                                <TextField
                                                                    autoFocus
                                                                    margin="dense"
                                                                    id="code"
                                                                    label="Code"
                                                                    type="text"
                                                                    fullWidth
                                                                    value={code.code}
                                                                    onChange={(e) => setCode({ ...code, code: e.target.value, voucher: voucher._id })}
                                                                />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleDialogClose} color="primary">
                                                                    Cancel
          </Button>
                                                                <Button onClick={handleOnCreateCode} color="primary">
                                                                    Submit
          </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </TableCell>




                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>
                        )}
            </div>
        </>
    )
}

export default CodeHandle;