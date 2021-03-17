import { combineReducers } from 'redux';

import vouchers from './vouchers';
import auth from './auth';
export default combineReducers({
    vouchers,
    auth,
});
