import * as api from '../api';
import { FETCH_ALL, DELETE, UPDATE, AUTH, CHECK_CURRENT_USER } from '../constants/actionTypes';

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

export const signin = (formData, history, previousPath) => async (dispatch) => {
    try {
        const { data } = await api.signInAdmin(formData);
        dispatch({ type: AUTH, data });
        /* 
        If previous path exists, then redirect to previous path.
        If not, redirect to home page.
        Note:
            set action equal to 0 to set default tab when redirect to profile page.
         */
        console.log(previousPath)
        previousPath
            ? history.push(`${previousPath}`, { action: 0 })
            : history.push('/dashboard/admin');
    } catch (error) {
        console.log(error);
    }
};

export const checkCurrentAdmin = (history) => async (dispatch) => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    try {
        /*Check user profile in local storage to get user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set state null and redirec to homepage
         */
        if (userProfile) {
            const { data } = await api.checkCurrentAdmin();
            dispatch({
                type: CHECK_CURRENT_USER,
                data: { result: data.result, token: userProfile.token },
            });
        } else {
            dispatch({ type: CHECK_CURRENT_USER, data: null });
        }
    } catch (error) {
        const previousPath = history.location.pathname;
        dispatch({ type: CHECK_CURRENT_USER, data: null });
        previousPath === '/'
            ? history.push('/dashboard/admin')
            : history.push('/admin/login', { previousPath });
    }
};