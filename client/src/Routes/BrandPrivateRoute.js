import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentBrand } from '../actions/brands';

const BrandPrivateRoute = ({ component: Component, ...rest }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        dispatch(checkCurrentBrand(history))
    }, []);

    return (
        <>
            {auth.isBrandChecking ?
                <div align="center">
                    <CircularProgress />
                </div>
                :
                <Route
                    {...rest}
                    render={(props) =>
                        auth.brandData ? (
                            <Component {...props} />
                        ) :
                            (
                                <Redirect
                                    to={{
                                        pathname: '/brand/login',
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


export default BrandPrivateRoute;
