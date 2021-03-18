import * as api from '../api';
import { CREATE, DELETE, UPDATE, FETCH_ALL } from '../constants/actionTypes';

//Action Brand
export const getBrands = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBrands();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createBrand = (newBrand) => async (dispatch) => {
    try {
        const { data } = await api.createBrand(newBrand);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
export const updateBrand = (id, updateBrand) => async (dispatch) => {
    try {
        const { data } = await api.updateBrand(id, updateBrand);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
export const deleteBrand = (id) => async (dispatch) => {
    try {
        await api.deleteBrand(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
