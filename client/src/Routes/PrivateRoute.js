import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {

    const { auth } = useSelector((state) => state);

    return (
        <>
            {auth.isUserChecking ? <CircularProgress /> :
                <Route
                    {...rest}
                    render={(props) =>
                        auth.authData ? (
                            <Component {...props} />
                        ) :
                            (
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
            }
        </>
    );

};

export default PrivateRoute;
