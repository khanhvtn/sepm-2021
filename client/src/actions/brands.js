import * as api from '../api';
import {
    CREATE,
    DELETE,
    UPDATE,
    FETCH_ALL_BRAND,
    BRAND_PENDING,
    IS_BRAND_CHECKING,
    CHECK_CURRENT_BRAND,
    AUTH_BRAND,
    USER_LOADING
} from '../constants/actionTypes';

//Action Brand
export const getBrands = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_PENDING, payload: true });
        const { data } = await api.fetchBrands();
        dispatch({ type: FETCH_ALL_BRAND, payload: data });
        dispatch({ type: BRAND_PENDING, payload: false });

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

export const checkCurrentBrand = (history) => async (dispatch) => {
    const brandProfile = JSON.parse(localStorage.getItem('brandProfile'));
    try {
        /*Check user profile in local storage to get user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set state null and redirec to homepage
         */
        if (brandProfile) {
            dispatch({
                type: IS_BRAND_CHECKING,
                payload: true,
            });
            const { data } = await api.checkCurrentBrand();
            console.log(data)
            dispatch({
                type: CHECK_CURRENT_BRAND,
                data: { result: data.result, token: brandProfile.token },
            });
            dispatch({
                type: IS_BRAND_CHECKING,
                payload: false,
            });
        } else {
            dispatch({ type: CHECK_CURRENT_BRAND, data: null });
            dispatch({
                type: IS_BRAND_CHECKING,
                payload: false,
            });
        }
    } catch (error) {
        // const previousPath = history.location.pathname;
        dispatch({ type: CHECK_CURRENT_BRAND, data: null });
        dispatch({
            type: IS_BRAND_CHECKING,
            payload: false,
        });
        console.log(error.message)
        // previousPath === '/'
        //     ? history.push('/')
        //     : history.push('/login', { isSignup: false, previousPath });
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.signUpBrand(formData);
        dispatch({ type: AUTH_BRAND, data });
        dispatch({ type: USER_LOADING, payload: false });
        history.push('/dashboard/brand');
    } catch (error) {
        dispatch({ type: USER_LOADING, payload: false });
        console.log(error);
    }
};
export const signin = (formData, history, previousPath) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.signInBrand(formData);
        dispatch({ type: AUTH_BRAND, data });
        dispatch({ type: USER_LOADING, payload: false });
        /* 
        If previous path exists, then redirect to previous path.
        If not, redirect to home page.
        Note:
            set action equal to 0 to set default tab when redirect to profile page.
         */
        previousPath
            ? history.push(`${previousPath}`, { action: 0 })
            : history.push('/dashboard/brand');
    } catch (error) {
        dispatch({ type: USER_LOADING, payload: false });
        console.log(error);
    }
};
