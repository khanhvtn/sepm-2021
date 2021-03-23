import * as api from '../api';
import { FETCH_ALL } from '../constants/actionTypes';

// Action Admin
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message)
    }
}