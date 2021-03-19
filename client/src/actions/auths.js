import * as api from '../api';
import {
    AUTH,
    CHECK_CURRENT_USER,
    UPDATE_USER,
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
    try {
        /*Check user profile in local storage to get user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set state null and redirec to homepage
         */
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        const { data } = await api.checkCurrentUser();
        dispatch({
            type: CHECK_CURRENT_USER,
            data: { result: data.result, token: userProfile.token },
        });
    } catch (error) {
        dispatch({ type: CHECK_CURRENT_USER, data: null });
        history.push('/');
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
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};
