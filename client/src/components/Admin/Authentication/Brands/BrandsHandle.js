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
import BrandDialog from './BrandDialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CircularProgress, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../../../../actions/brands'
import moment from 'moment';


const BrandsHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const brands = useSelector(state => state.brands)

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
        dispatch(deleteBrand(id))
        setAnchorEl(null)
    }

    useEffect(() => {
        setLoading(true)
        dispatch(getBrands());
        setLoading(false)
    }, []);

    return (
        <>
            <div className={classes.main}>
                <BrandDialog handleDialogClose={handleDialogClose} open={open} />
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
                                        Add brand
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

                    {loading &&
                        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
                            <Grid item style={{ textAlign: 'center' }}>
                                <CircularProgress variant="indeterminate" />
                            </Grid>
                        </Grid>
                    }
                    {brands.length === 0
                        ?
                        <div className={classes.contentWrapper}>
                            <Typography color="textSecondary" align="center">
                                No brands for this project yet
                            </Typography>
                        </div>
                        :
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key='identifier'> Identifier </TableCell>
                                            <TableCell key='brand'> Brand </TableCell>
                                            <TableCell key='category'> Category </TableCell>
                                            <TableCell key='createdAt'> Created </TableCell>
                                            <TableCell key='brand-uid'> Brand UID </TableCell>
                                            <TableCell key='setting' />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((brand) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={brand._id}>
                                                <TableCell key='email' align='left'>{brand.email}</TableCell>
                                                <TableCell key='name' align='left'>{brand.name}</TableCell>
                                                <TableCell key='category' align='left'>{brand.category}</TableCell>
                                                <TableCell key='createdAt' align='left'>{moment(brand.createdAt).fromNow()}</TableCell>
                                                <TableCell key='bid' align='left'>{brand._id}</TableCell>
                                                <TableCell key='setting' align='right'>
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
                                                        <MenuItem onClick={handleDialogOpen}>Edit</MenuItem>
                                                        <MenuItem onClick={() => handleDeleteBrand(brand._id)}>
                                                            Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={brands.length}
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
    );
}

export default BrandsHandle;


