import { combineReducers } from 'redux';

import vouchers from './vouchers';
import brands from './brands';
import auth from './auth';

export default combineReducers({
    brands,
    vouchers,
    auth,
});
