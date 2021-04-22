import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentAdmin } from '../actions/admins';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const isMount = useIsMount();

    const dispatch = useDispatch();
    const history = useHistory();

    const { adminData } = useSelector((state) => state.auth);
    const state = useSelector((state) => state.auth)


    useEffect(() => {
        setLoading(true)
        dispatch(checkCurrentAdmin(history))
        setLoading(false)
    }, [dispatch, adminData]);

    return (
        <>
            { loading ? <CircularProgress /> :
                <Route
                    {...rest}
                    render={(props) =>
                        adminData ? (
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
