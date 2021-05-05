import * as api from '../api'
import {FETCH_ALL_CODE, CREATE_CODE, DELETE_CODE} from '../constants/actionTypes'
export const getCodes = () => async (dispatch) => {
    try {
        const {data} = await api.fetchCodes();
        dispatch({ type: FETCH_ALL_CODE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createCode = (newCode) => async (dispatch) => {
    try {
        const { data } = await api.createCode(newCode);
        dispatch({type: CREATE_CODE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCode = (id) => async (dispatch) => {
    try {
        const {data} = await api.deleteCode(id);
        dispatch({type: DELETE_CODE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}