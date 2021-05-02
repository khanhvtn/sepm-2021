import * as api from '../api';
import { 
    CREATE, 
    DELETE, 
    UPDATE, 
    FETCH_ALL_VOUCHER, 
    FETCH_BY_CATEGORY,
    VOUCHER_PENDING
} from '../constants/actionTypes';

//Action Voucher
export const getVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: VOUCHER_PENDING, payload: true });
        const { data } = await api.fetchVouchers();
        dispatch({ type: FETCH_ALL_VOUCHER, payload: data });
        dispatch({ type: VOUCHER_PENDING, payload: false });
    } catch (error) {
        console.log(error.message);
    }
};

export const getVouchersByCategory = () => async(dispatch) => {
    try {
        const {data} = await api.fetchVouchersByCategory();
        dispatch({ type: FETCH_BY_CATEGORY, payload: data });
    } catch (error) {
        console.log(error.message);

    }
}

export const createVoucher = (newVoucher) => async (dispatch) => {
    try {
        const { data } = await api.createVoucher(newVoucher);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
export const updateVoucher = (id, updateVoucher) => async (dispatch) => {
    try {
        const { data } = await api.updateVoucher(id, updateVoucher);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
export const deleteVoucher = (id) => async (dispatch) => {
    try {
        await api.deleteVoucher(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
