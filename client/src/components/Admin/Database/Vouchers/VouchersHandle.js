import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { setVoucherStatus } from '../../../../actions/admins';
import { getVouchers } from '../../../../actions/vouchers';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const VouchersHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchChange = event => { setSearchTerm(event.target.value) }


    const [action, setAction] = useState('ACCEPT');

    const { vouchers } = useSelector(state => state)

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


    const acceptVoucher = (id) => {
        dispatch(setVoucherStatus(id, { type: action }))
    }

    const declineVoucher = (id) => {
        dispatch(setVoucherStatus(id, null))
    }


    useEffect(() => {
        dispatch(getVouchers());
    }, [dispatch]);

    useEffect(() => {
        const listVouchers = !searchTerm ? vouchers.allVouchers : vouchers.allVouchers.filter(voucher => voucher.brand.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResult(listVouchers)
    }, [searchTerm, vouchers.isLoading]);

    return (
        <>
            <div className={classes.main}>
                <Paper className={classes.paper}>
                    <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon className={classes.block} color="inherit" />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by email address, phone number, or user UID"
                                        onChange={handleSearchChange}
                                        value={searchTerm}
                                        InputProps={{
                                            disableUnderline: true,
                                            className: classes.searchInput,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDialogOpen}
                                        className={classes.addUser}>
                                        Add voucher
                                    </Button>
                                    <Tooltip title="Reload">
                                        <IconButton onClick={() => window.location.reload(false)}>
                                            <RefreshIcon className={classes.block} color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {vouchers.isLoading ?
                        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
                            <Grid item style={{ textAlign: 'center' }}>
                                <CircularProgress variant="indeterminate" />
                            </Grid>
                        </Grid>
                        :
                        searchResult.length === 0
                            ?
                            <div className={classes.contentWrapper}>
                                <Typography color="textSecondary" align="center">
                                    No vouchers for this project yet
                                </Typography>
                            </div>
                            :
                            <Paper className={classes.root}>
                                <TableContainer className={classes.container}>
                                    <Table aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell key='brand-name'>Brand </TableCell>
                                                <TableCell key='title'> Title </TableCell>
                                                <TableCell key='price'> Price </TableCell>
                                                <TableCell key='voucher-id'> VID </TableCell>
                                                <TableCell key='setting' />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((voucher) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={voucher._id}>
                                                    <TableCell key='creatorName' align='left'>{voucher.brand}</TableCell>
                                                    <TableCell key='vTitle' align='left'>{voucher.title}</TableCell>
                                                    <TableCell key='name' align='left'>{voucher.price}</TableCell>
                                                    <TableCell key='_id' align='left'>{voucher._id}</TableCell>
                                                    <TableCell key='setting' align='center'>
                                                        {voucher.isActive === true && <DoneIcon color='primary' />}
                                                        {voucher.isActive === false && <CloseIcon color='secondary' />}

                                                        {voucher.isActive === null ?
                                                            <>
                                                                <Button
                                                                    className={classes.pd5}
                                                                    variant="contained"
                                                                    onClick={() => acceptVoucher(voucher._id)}
                                                                    color="primary">
                                                                    Accept
                                                            </Button>
                                                                <Button
                                                                    className={classes.pd5}
                                                                    variant="contained"
                                                                    onClick={() => declineVoucher(voucher._id)}
                                                                    color="secondary">
                                                                    Decline
                                                            </Button>
                                                            </>
                                                            : null
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={searchResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </Paper>
                    }
                </Paper>
            </div>
        </>
    );
}

export default VouchersHandle;