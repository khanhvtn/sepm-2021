import { CREATE, DELETE, UPDATE, FETCH_ALL } from '../constants/actionTypes';

const voucherReducer = (vouchers = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...vouchers, action.payload];
        case UPDATE:
            return vouchers.map((voucher) =>
                voucher._id === action.payload._id ? action.payload : voucher
            );
        case DELETE:
            return vouchers.filter((voucher) => voucher._id !== action.payload);
        default:
            return vouchers;
    }
};
export default voucherReducer;
