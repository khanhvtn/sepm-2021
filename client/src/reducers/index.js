import { combineReducers } from 'redux';

import vouchers from './vouchers';
import brands from './brands';

export default combineReducers({
    brands,
    vouchers,
});
