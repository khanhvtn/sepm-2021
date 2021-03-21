import * as api from '../api';
import {
    AUTH,
    CHECK_CURRENT_USER,
    UPDATE_USER,
    USER_LOADING,
} from '../constants/actionTypes';

export const updateUser = (newUpdateUser) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(newUpdateUser);
        dispatch({ type: UPDATE_USER, data });
    } catch (error) {
        console.log(error);
    }
};
export const checkCurrentUser = (history) => async (dispatch) => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    try {
        /*Check user profile in local storage to get user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set state null and redirec to homepage
         */
        if (userProfile) {
            dispatch({
                type: USER_LOADING,
                payload: true,
            });
            const { data } = await api.checkCurrentUser();
            dispatch({
                type: CHECK_CURRENT_USER,
                data: { result: data.result, token: userProfile.token },
            });
            dispatch({
                type: USER_LOADING,
                payload: false,
            });
        } else {
            dispatch({ type: CHECK_CURRENT_USER, data: null });
            dispatch({
                type: USER_LOADING,
                payload: false,
            });
        }
    } catch (error) {
        const previousPath = history.location.pathname;
        dispatch({ type: CHECK_CURRENT_USER, data: null });
        dispatch({
            type: USER_LOADING,
            payload: false,
        });
        previousPath === '/'
            ? history.push('/')
            : history.push('/login', { isSignup: false, previousPath });
    }
};
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};
export const signin = (formData, history, previousPath) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        /* 
        If previous path exists, then redirect to previous path.
        If not, redirect to home page.
        Note:
            set action equal to 0 to set default tab when redirect to profile page.
         */
        previousPath
            ? history.push(`${previousPath}`, { action: 0 })
            : history.push('/');
    } catch (error) {
        console.log(error);
    }
};
