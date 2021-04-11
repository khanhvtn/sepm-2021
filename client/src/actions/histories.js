import * as api from '../api'
import { CREATE, DELETE, UPDATE, FETCH_ALL } from '../constants/actionTypes';

export const getHistories = () => async(dispatch) => {
    try {
        const {data} = await api.fetchHistories();
        dispatch({type: FETCH_ALL, payload: data})
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const createHistory = (newHistory, history) => async (dispatch) => {
    try {
        const {data} = await api.createHistory(newHistory);
        dispatch({type: CREATE, payload: data})
        history.push('/detail')
    } catch (error) {
        console.log(error)
    }
} 

export const deleteHistory = (id) => async(dispatch) => {
    try {
        await api.deleteHistory(id);
        dispatch({type: DELETE, payload: data})
    } catch (error) {
        console.log(error.message)

    }
} 