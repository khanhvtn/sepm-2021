import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import CreateVoucher from './components/Vouchers/CreateVoucher/CreateVoucher';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import BrandHome from './components/Brands/BrandHome/BrandHome'
import CreateBrand from './components/Brands/CreateBrand/CreateBrand';
import Auth from './components/Auth/Auth';
import Detail from './components/Detail/Detail'
import PurchaseProceed from './components/Detail/PurchaseProceed'
import VoucherList from './components/VoucherList/VoucherList'
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
import BlankLayout from './components/Layout/Blank/BlankLayout';
import GetLink from './components/GetLink/GetLink';
import Memorai from './components/Games/Memorai/Memorai';
import GameCenter from './components/Games/GameCenter';
import RPSGame from './components/Games/RPS/RPSGame';
import PublishVoucherDetail from './components/GetLink/PublishVoucherDetail/PublishVoucherDetail';
import BrandLayout from './components/Layout/Brand/BrandLayout';
import BrandHomeDashboard from './components/BrandDashboard/BrandHomeDashboard';
import VoucherHandle from './components/BrandDashboard/VoucherHandle/VoucherHandle';
import CodeHandle from './components/BrandDashboard/CodeHandle/CodeHandle';
import BrandLogin from './components/BrandDashboard/BrandLogin/BrandLogin';

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
                            <Route path='/admin/login' component={AdminLogin} />
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

                <Route path='/brand/:path?' exact>
                    <BlankLayout>
                        <Switch>
                            <Route path='/brand/login' component={BrandLogin} />
                            <Route component={Error} />
                        </Switch>
                    </BlankLayout>
                </Route>
                
                <Route path='/dashboard/brand/:path?' exact>
                    <BrandLayout>
                        <Switch>
                            <Route path='/dashboard/brand' component={BrandHomeDashboard} exact/>
                            <Route path='/dashboard/brand/vouchers' component={VoucherHandle} />
                            <Route path='/dashboard/brand/codes' component={CodeHandle} />
                        </Switch>
                    </BrandLayout>
                </Route>

                <Route>
                    <UserLayout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute exact path="/share-link" component={GetLink} />
                            <Route exact path="/voucher/share/:id" component={PublishVoucherDetail} />
                            {/* Testing */}
                            <Route exact path="/create-voucher" component={CreateVoucher} />
                            <Route exact path="/create-brand" component={CreateBrand} />
                            {/* End Testing */}
                            <Route exact path="/brand" component={BrandHome} />

                            <Route path="/login">
                                <Auth isSignup={false} />
                            </Route>

                            <Route path="/register">
                                <Auth isSignup={true} />
                            </Route>

                            <PrivateRoute
                                exact
                                path="/game-center"
                                component={GameCenter}
                            />

                            <PrivateRoute
                                exact
                                path="/game-center/memorai"
                                component={Memorai}
                            />

                            <PrivateRoute
                                path="/game-center/rps-game"
                                component={RPSGame}
                            />

                            <Route exact path="/vouchers/category/:cat">
                                <VoucherList />
                            </Route>

                            <PrivateRoute
                                exact
                                path="/user-profile"
                                component={UserProfile}
                            />

                            <Route exact path="/detail/:id" component={Detail} />

                            <PrivateRoute
                                exact
                                path="/proceed/:id"
                                component={PurchaseProceed}
                            />

                            <Route component={Error} />
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </Router >
    );
};

export default App;
