import * as api from '../api';
import { AUTH, CHECKUSERLOGIN } from '../constants/actionTypes';

export const checkUserLogin = () => async (dispatch) => {
    try {
        /*Check user profile in local storage.
        If have user, use id in user profile to fetch new user information and update state.
        If not set state null
         */
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            const { data } = await api.getUser(userProfile.id);
            dispatch({
                type: CHECKUSERLOGIN,
                data: { result: data.result, token: userProfile.token },
            });
        } else {
            dispatch({ type: CHECKUSERLOGIN, data: null });
        }
    } catch (error) {
        console.log(error);
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
