import { CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_ACCEPTED_VOUCHER } from '../constants/actionTypes';


const initialState = {
    allVouchers: [],
    acceptedVouchers: []
}

const voucherReducer = (vouchers = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...vouchers, allVouchers: action.payload };
        case FETCH_ACCEPTED_VOUCHER:
            return { ...vouchers, acceptedVouchers: action.payload };
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
