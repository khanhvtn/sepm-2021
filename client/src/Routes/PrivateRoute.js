import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData, isLoading } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoading ? (
                    <CircularProgress />
                ) : authData ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                isSignup: false,
                                previousPath: props.location.pathname,
                            },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
