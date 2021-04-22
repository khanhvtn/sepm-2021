import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { checkCurrentAdmin } from '../actions/admins';


export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};


const AdminPrivateRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const isMount = useIsMount();

    const dispatch = useDispatch();
    const history = useHistory();

    const [auth, setAuth] = useState()

    const { adminData } = useSelector((state) => state.auth);
    const state = useSelector((state) => state.auth)


    useEffect(async () => {
        if (isMount) {
            setLoading(true)
            dispatch(checkCurrentAdmin(history))
        } else {
            setLoading(false)
        }

    }, [dispatch]);

    return (
        <>
            { loading && isMount ? <CircularProgress /> :
                <Route
                    {...rest}
                    render={(props) =>
                        adminData ? (
                            <Component {...props} />
                        ) : null
                        // (
                        //     <Redirect
                        //         to={{
                        //             pathname: '/admin/login',
                        //             state: {
                        //                 isSignup: false,
                        //                 previousPath: props.location.pathname,
                        //             },
                        //         }}
                        //     />
                        // )
                    }
                />
            }
        </>
    );
};


export default AdminPrivateRoute;
