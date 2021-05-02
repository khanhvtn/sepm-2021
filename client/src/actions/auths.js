import * as api from '../api';
import {
    AUTH_USER,
    CHECK_CURRENT_USER,
    UPDATE_USER,
    USER_LOADING,
    IS_USER_CHECKING,
    USER_WIN_GAME,
    ERROR,
} from '../constants/actionTypes';

export const updateUser = (newUpdateUser) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.updateUser(newUpdateUser);
        dispatch({ type: UPDATE_USER, data });
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: USER_LOADING, payload: false });
};
export const winGame = (newUpdateUser) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.userWinGame(newUpdateUser);
        dispatch({ type: USER_WIN_GAME, data });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.response.data });
    }
    dispatch({ type: USER_LOADING, payload: false });
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
                type: IS_USER_CHECKING,
                payload: true,
            });
            const { data } = await api.checkCurrentUser();
            dispatch({
                type: CHECK_CURRENT_USER,
                data: { result: data.result, token: userProfile.token },
            });
            dispatch({
                type: IS_USER_CHECKING,
                payload: false,
            });
        } else {
            dispatch({ type: CHECK_CURRENT_USER, data: null });
            dispatch({
                type: IS_USER_CHECKING,
                payload: false,
            });
        }
    } catch (error) {
        const previousPath = history.location.pathname;
        dispatch({ type: CHECK_CURRENT_USER, data: null });
        dispatch({
            type: IS_USER_CHECKING,
            payload: false,
        });
        // previousPath === '/'
        //     ? history.push('/')
        //     : history.push('/login', { isSignup: false, previousPath });
    }
};
export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH_USER, data });
        dispatch({ type: USER_LOADING, payload: false });
        history.push('/');
    } catch (error) {
        dispatch({ type: USER_LOADING, payload: false });
        console.log(error);
    }
};
export const signin = (formData, history, previousPath) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH_USER, data });
        dispatch({ type: USER_LOADING, payload: false });
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
        dispatch({ type: USER_LOADING, payload: false });
        console.log(error);
    }
};
