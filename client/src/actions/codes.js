import * as api from '../api'
import {FETCH_ALL_CODE} from '../constants/actionTypes'
export const getCodes = () => async (dispatch) => {
    try {
        const {data} = await api.fetchCodes();
        dispatch({ type: FETCH_ALL, payload: data })

    } catch (error) {
        console.log(error.message)
    }
}