import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useSelector((state) => state.auth);
    
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
};

export default PrivateRoute;
