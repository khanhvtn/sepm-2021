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
import AdminLayout from './components/Layout/Admin/AdminLayout';
import UserLayout from './components/Layout/User/UserLayout';
import Authentication from './components/Admin/Authentication/Authentication'
import Database from './components/Admin/Database/Database';
import Functions from './components/Admin/Functions/Functions';
import UserProfile from './components/User/UserProfile';
import PrivateRoute from './Routes/PrivateRoute';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(checkCurrentUser(history));
    }, []);

    return (
        <Router>
            <Switch>
                <Route path='/admin/:path?' exact>
                    <AdminLayout>
                        <Switch>
                            <Route path='/admin' component={AdminHome} exact />
                            <Route path='/admin/users' component={Authentication} />
                            <Route path='/admin/brands' component={Authentication} />
                            <Route path='/admin/orders' component={Database} />
                            <Route path='/admin/vouchers' component={Database} />
                            <Route path='/admin/voucher-state' component={Functions} />
                            <Route path='/admin/share-link' component={Functions} />
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
