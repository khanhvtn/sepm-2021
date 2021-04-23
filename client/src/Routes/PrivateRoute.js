import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentUser } from '../api';


const PrivateRoute = ({ component: Component, ...rest }) => {

    const dispatch = useDispatch();
    const history = useHistory();
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
