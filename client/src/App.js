import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import BrandHome from './components/Brands/BrandHome/BrandHome'
import CreateBrand from './components/Brands/CreateBrand/CreateBrand';
import Auth from './components/Auth/Auth';
import { checkCurrentUser } from './actions/auths';
import AdminHome from './components/Admin/AdminHome'
import AdminLogin from './components/Admin/Login/AdminLogin';
import AdminLayout from './components/Layout/Admin/AdminLayout';
import UserLayout from './components/Layout/User/UserLayout';
import Authentication from './components/Admin/Authentication/Authentication'
import Database from './components/Admin/Database/Database';
import Functions from './components/Admin/Functions/Functions';
import UserProfile from './components/User/UserProfile';
import PrivateRoute from './Routes/PrivateRoute';
import AdminPrivateRoute from './Routes/AdminPrivateRoute'
import { checkCurrentAdmin } from './actions/admins';
import BlankLayout from './components/Layout/Blank/BlankLayout';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(checkCurrentUser(history));
    }, [dispatch]);

    return (
        <Router>
            <Switch>
                <Route path='/admin/:path?' exact>
                    <BlankLayout>
                        <Switch>
                            <Route path='/admin/login' component={AdminLogin} exact />
                            <Route component={Error} />
                        </Switch>
                    </BlankLayout>
                </Route>

                <Route path='/dashboard/admin/:path?' exact>
                    <AdminLayout>
                        <Switch>
                            <AdminPrivateRoute path='/dashboard/admin' component={AdminHome} exact />
                            <AdminPrivateRoute path='/dashboard/admin/users' component={Authentication} />
                            <AdminPrivateRoute path='/dashboard/admin/brands' component={Authentication} />
                            <AdminPrivateRoute path='/dashboard/admin/orders' component={Database} />
                            <AdminPrivateRoute path='/dashboard/admin/vouchers' component={Database} />
                            <AdminPrivateRoute path='/dashboard/admin/voucher-state' component={Functions} />
                            <AdminPrivateRoute path='/dashboard/admin/share-link' component={Functions} />
                            <Route component={Error} />
                        </Switch>
                    </AdminLayout>
                </Route>

                <Route>
                    <UserLayout>
                        <Switch>
                            <Route path='/' component={Home} exact />
                            <Route path='/login' component={Auth} />
                            <Route path='/register' component={Auth} />
                            <PrivateRoute
                                exact
                                path="/user-profile"
                                component={UserProfile}
                            />
                            <Route path='/brand' component={BrandHome} />
                            <Route path='/create-voucher' component={CreateVoucher} />
                            <Route path='/create-brand' component={CreateBrand} />
                            <Route component={Error} />
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </Router >
    );
};

export default App;
