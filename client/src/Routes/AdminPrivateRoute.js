import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentAdmin } from '../actions/admins';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        dispatch(checkCurrentAdmin(history))
    }, []);

    return (
        <>
            {auth.isAdminChecking ? <CircularProgress /> :
                <Route
                    {...rest}
                    render={(props) =>
                        auth.adminData ? (
                            <Component {...props} />
                        ) :
                            (
                                <Redirect
                                    to={{
                                        pathname: '/admin/login',
                                        state: {
                                            isSignup: false,
                                            previousPath: props.location.pathname,
                                        },
                                    }}
                                />
                            )
                    }
                />
            }
        </>
    );
};


export default AdminPrivateRoute;
