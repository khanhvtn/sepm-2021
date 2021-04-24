import * as api from '../api';
import { CREATE_LINK, LINK_PENDING } from '../constants/actionTypes';


export const createShareLink = (voucherId) => async (dispatch) => {
    console.log("Voucher Id from ACTION:", voucherId)

    try {
        dispatch({ type: LINK_PENDING, payload: true });
        const { data } = await api.createShareLink(voucherId);
    
        dispatch({ type: CREATE_LINK, payload: data });
        dispatch({ type: LINK_PENDING, payload: false });
    } catch (error) {
        console.log(error.message);
    }
};