import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentUser } from '../actions/auths';


const PrivateRoute = ({ component: Component, ...rest }) => {

    const authData  = useSelector((state) => state.auth);
    const { loading } = rest

    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <Route
                {...rest}
                render={(props) =>
                    authData ? (
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
    }
};

export default PrivateRoute;
