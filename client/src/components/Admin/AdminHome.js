import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { checkCurrentAdmin } from '../../api';
import useStyles from './styles'


const AdminHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const adminData = useSelector(state => state)
    console.log(adminData)

    // useEffect(() => {
    //     dispatch(checkCurrentAdmin(history));
    // }, []);


    return (
        <>
            <h1> Welcome to the Admin Dashboard</h1>
        </>
    );
}

export default AdminHome;
