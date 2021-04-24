import { combineReducers } from 'redux';

import vouchers from './vouchers';
import brands from './brands';
import auth from './auth';
import users from './users';
import error from './errors';
import links from './links';

export default combineReducers({
    brands,
    vouchers,
    auth,
    users,
    error,
    links
});
