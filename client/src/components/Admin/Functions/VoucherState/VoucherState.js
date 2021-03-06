import React, { useState, useEffect } from 'react';
import useStyles from './styles'
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, CircularProgress, Typography } from '@material-ui/core';
import { getAcceptedVoucher, publishVoucher } from '../../../../actions/admins';


const ThreeDotMenu = ({ data }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [action, setAction] = useState('PUBLISH');
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUnpublishVoucher = (id) => {
        console.log("Unpublish ID: ", id)
        dispatch(publishVoucher(id, null))
        setAnchorEl(null)
    };

    const handlePublishVoucher = (id) => {
        console.log("Publish ID: ", id)
        dispatch(publishVoucher(id, { type: action }))
        setAnchorEl(null)
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handlePublishVoucher(data)}>Publish</MenuItem>
                <MenuItem onClick={() => handleUnpublishVoucher(data)}>Remove</MenuItem>
            </Menu>
        </>
    )
}

const VoucherState = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchChange = event => { setSearchTerm(event.target.value) }


    const { vouchers } = useSelector(state => state)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const reloadTable = () => {
        setReload(!reload)
    }


    useEffect(() => {
        dispatch(getAcceptedVoucher())
    }, [dispatch, reload]);

    useEffect(() => {
        const listVouchers = !searchTerm ? vouchers.acceptedVouchers : vouchers.acceptedVouchers.filter(voucher => voucher.brand.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResult(listVouchers)
    }, [searchTerm, vouchers.isLoading, vouchers.acceptedVouchers]);

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
                                    <Button variant="contained"
                                        color="primary"
                                        onClick={handleDialogOpen}
                                        className={classes.addUser}>
                                        Share voucher
                                    </Button>
                                    <Tooltip title="Reload">
                                        <IconButton onClick={reloadTable}>
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
                                    No sharable voucher for this project yet
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
                                                <TableCell key='voucher-status'> Status </TableCell>
                                                <TableCell key='setting' />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((voucher) => (
                                                <TableRow hover role="checkbox" key={voucher._id}>
                                                    <TableCell key='creatorName' align='left'>{voucher.brand}</TableCell>
                                                    <TableCell key='vTitle' align='left'>{voucher.title}</TableCell>
                                                    <TableCell key='name' align='left'>{voucher.price}</TableCell>
                                                    <TableCell key='_id' align='left'>{voucher._id}</TableCell>
                                                    <TableCell key='status' align='left'>
                                                        {voucher.isPublished ?
                                                            <Chip
                                                                className={classes.fixedWidthChip}
                                                                size="small"
                                                                label="Publish"
                                                                color="primary"
                                                            />
                                                            :
                                                            <Chip
                                                                className={classes.setPendingColorChip}
                                                                size="small"
                                                                label="Pending"
                                                            />
                                                        }
                                                    </TableCell>
                                                    <TableCell key='setting' align='center'>
                                                        <ThreeDotMenu data={voucher._id} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={searchResult.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                    }
                </Paper>
            </div>
        </>
    )
}

export default VoucherState;