import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useSelector((state) => state.auth);
    console.log(authData)

    return (
        <Route
            {...rest}
            render={(props) =>
                authData ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: {
                                    previousPath: props.location.pathname,
                                },
                            }}
                        />
                    )
            }
        />
    );
};

export default AdminPrivateRoute;
