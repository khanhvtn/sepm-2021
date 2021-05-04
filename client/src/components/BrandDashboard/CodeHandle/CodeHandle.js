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
import { Button, CircularProgress} from '@material-ui/core';



const CodeHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const vouchers = useSelector((state) => state.vouchers);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getVouchers());
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