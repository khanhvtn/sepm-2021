import {
    CREATE,
    DELETE,
    UPDATE,
    FETCH_ALL_VOUCHER,
    FETCH_ACCEPTED_VOUCHER,
    PUBLISH_VOUCHER,
    FETCH_BY_CATEGORY,
    VOUCHER_PENDING,
    FETCH_PUBLISHED_VOUCHER
} from '../constants/actionTypes';


const initialState = {
    allVouchers: [],
    acceptedVouchers: [],
    publishedVouchers: [],
    isLoading: false,
}

const voucherReducer = (vouchers = initialState, action) => {
    switch (action.type) {
        case VOUCHER_PENDING:
            return { ...vouchers, isLoading: action.payload }
        case FETCH_ALL_VOUCHER:
            return { ...vouchers, allVouchers: action.payload };
        case FETCH_ACCEPTED_VOUCHER:
            return { ...vouchers, acceptedVouchers: action.payload };
        case FETCH_PUBLISHED_VOUCHER:
            return { ...vouchers, publishedVouchers: action.payload };
        case FETCH_BY_CATEGORY:
            return { ...vouchers, acceptedVouchers: action.payload }
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
