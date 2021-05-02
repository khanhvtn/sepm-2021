import * as api from '../api'
import { CREATE_HISTORY, DELETE, FETCH_ALL, IS_SUCCESS_PURCHASE } from '../constants/actionTypes';

export const getHistories = () => async (dispatch) => {
    try {
        const { data } = await api.fetchHistories();
        dispatch({ type: FETCH_ALL, payload: data })
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const createHistory = (newHistory, history) => async (dispatch) => {
    try {
        const { data } = await api.createHistory(newHistory);
        dispatch({ type: CREATE_HISTORY, payload: data });
        //If purchase is successful, set isPurchaseSuccess = true
        dispatch({
            type: IS_SUCCESS_PURCHASE, 
            payload: true
        });
        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteHistory = (id) => async (dispatch) => {
    try {
        await api.deleteHistory(id);
        dispatch({ type: DELETE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}