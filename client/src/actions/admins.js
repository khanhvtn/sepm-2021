import * as api from '../api';
import { FETCH_ALL, DELETE, UPDATE } from '../constants/actionTypes';

// Action Admin
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const setVoucherStatus = (id, action) => async (dispatch) => {
    try {
        console.log(action)
        const { data } = await api.setVoucher(id, action);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}