import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getVouchers } from './actions/vouchers';
import { getBrands } from './actions/brands';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import BrandHome from './components/Brands/BrandHome/BrandHome'
import CreateBrand from './components/Brands/CreateBrand/CreateBrand';
import Auth from './components/Auth/Auth';
import { checkUserLogin } from './actions/auths';
import AdminHome from './components/Admin/AdminHome'
import AdminLayout from './components/Layout/Admin/AdminLayout';
import UserLayout from './components/Layout/User/UserLayout';
import AppRoute from './AppRoute'




const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserLogin());
        dispatch(getVouchers());
    }, [currentId, dispatch]);

    return (
        <Router>
            <Switch>
                <AppRoute exact path="/" component={Home} layout={UserLayout} />
                <AppRoute exact path="/admin" layout={AdminLayout} component={AdminHome} />
                <AppRoute exact path="/create-voucher" layout={UserLayout} component={CreateVoucher} currentId={currentId} setCurrentId={setCurrentId} />
                <AppRoute exact path="/create-brand" layout={UserLayout} component={CreateBrand} />
                <AppRoute exact path="/brand" layout={UserLayout} component={BrandHome} />
                <AppRoute exact path="/login" layout={UserLayout} component={Auth} isSignup={false} />
                <AppRoute exact path="/register" layout={UserLayout} component={Auth} isSignup={true} />
                <AppRoute layout={UserLayout} component={Error} />
            </Switch>
        </Router >
    );
};

export default App;
