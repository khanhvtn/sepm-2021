import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


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
