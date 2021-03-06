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
    const [reload, setReload] = useState(false);

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const handleSearchChange = event => { setSearchTerm(event.target.value) }

    const { users } = useSelector(state => state)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleClick = (event, id) => {
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

    const handleDeleteUser = (e, id) => {
        dispatch(deleteUser(id))
    }

    const reloadTable = () => [
        setReload(!reload)
    ]

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, reload]);

    useEffect(() => {
        const listUsers = !searchTerm ? users.users : users.users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResult(listUsers)
    }, [searchTerm, users.isLoading]);

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
                                        value={searchTerm}
                                        onChange={handleSearchChange}
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
                                        disabled
                                        onClick={handleDialogOpen}
                                        className={classes.addUser}>
                                        Add user
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
                    {users.isLoading ?
                        <Grid container className={classes.contentWrapper} direction="column" alignItems="stretch">
                            <Grid item style={{ textAlign: 'center' }}>
                                <CircularProgress variant="indeterminate" />
                            </Grid>
                        </Grid>
                        :
                        searchResult.length === 0 ?
                            <div className={classes.contentWrapper}>
                                <Typography color="textSecondary" align="center">
                                    No users for this project yet
                                </Typography>
                            </div>
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

                                            {searchResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                                    <TableCell key='email' align='left'>{user.email}</TableCell>
                                                    <TableCell key='createdAt' align='left'>{moment(user.createdAt).format('LL')}</TableCell>
                                                    <TableCell key='name' align='left'>{user.name}</TableCell>
                                                    <TableCell key='_id' align='left'>{user._id}</TableCell>

                                                    <TableCell key='setting' align='right'>

                                                        <Button color="primary" onClick={(e) => handleDeleteUser(e, user._id)}>
                                                            Delete
                                                        </Button>

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

export default UsersHandle;


