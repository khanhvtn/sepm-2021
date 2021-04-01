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
import { getUsers } from '../../../../actions/admins'
import { CircularProgress, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserDialog from './UserDialog'
import moment from 'moment';
import { deleteUser } from '../../../../actions/admins';

const UsersHandle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const users = useSelector(state => state.users)

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
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
        setAnchorEl(null)
    }

    useEffect(() => {
        dispatch(getUsers());
    }, []);



    return (
        <>
            <div className={classes.main}>
                <UserDialog handleDialogClose={handleDialogClose} open={open} />
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDialogOpen}
                                        className={classes.addUser}>
                                        Add user
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
                    {users.length === 0 ? (<div className={classes.contentWrapper}>
                        <Typography color="textSecondary" align="center">
                            No users for this project yet
                        </Typography>
                    </div>) : null
                    }
                    {!users.length
                        ?
                        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
                            <Grid item style={{ textAlign: 'center' }}>
                                <CircularProgress variant="indeterminate" />
                            </Grid>
                        </Grid>
                        :
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key='identifier'>Identifier </TableCell>
                                            <TableCell key='created'> Created </TableCell>
                                            <TableCell key='signed-in'> Signed In </TableCell>
                                            <TableCell key='user-uid'> User UID </TableCell>
                                            <TableCell key='setting' />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                                <TableCell key='email' align='left'>{user.email}</TableCell>
                                                <TableCell key='createdAt' align='left'>{moment(user.createdAt).format('LL')}</TableCell>
                                                <TableCell key='name' align='left'>{user.name}</TableCell>
                                                <TableCell key='_id' align='left'>{user._id}</TableCell>
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
                                                        <MenuItem onClick={() => handleDeleteUser(user._id)}>
                                                            Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={users.length}
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

export default UsersHandle;


