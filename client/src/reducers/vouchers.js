import { CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_ACCEPTED_VOUCHER, PUBLISH_VOUCHER } from '../constants/actionTypes';


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
            return { ...vouchers, allVouchers: action.payload };
        case UPDATE:
            return {
                ...vouchers, allVouchers: vouchers.acceptedVouchers.map((voucher) =>
                    voucher._id === action.payload._id ? action.payload : voucher
                )
            };
        case PUBLISH_VOUCHER:
            return {
                ...vouchers, acceptedVouchers: vouchers.acceptedVouchers.map((voucher) =>
                    voucher._id === action.payload._id ? action.payload : voucher
                )
            };
        case DELETE:
            return vouchers.allVouchers.filter((voucher) => voucher._id !== action.payload);
        default:
            return vouchers;
    }
};
export default voucherReducer;
