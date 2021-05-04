import * as api from '../api';
import { 
    FETCH_ALL_USER, 
    DELETE, UPDATE, 
    AUTH_ADMIN, 
    CHECK_CURRENT_ADMIN, 
    FETCH_ACCEPTED_VOUCHER, 
    PUBLISH_VOUCHER,
    USER_PENDING,
    IS_ADMIN_CHECKING,
    USER_LOADING,
    VOUCHER_PENDING,
    FETCH_PUBLISHED_VOUCHER
} from '../constants/actionTypes';

// Action Admin
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_PENDING, payload: true });
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL_USER, payload: data });
        dispatch({ type: USER_PENDING, payload: false });
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

export const getAcceptedVoucher = () => async (dispatch) => {
    try {
        dispatch({ type: VOUCHER_PENDING, payload: true });
        const { data } = await api.fetchAcceptedVouchers();
        dispatch({ type: FETCH_ACCEPTED_VOUCHER, payload: data })
        dispatch({ type: VOUCHER_PENDING, payload: false });
    } catch (error) {
        console.log(error.message)
    }
}

export const getPublishedVoucher = () => async (dispatch) => {
    try {
        dispatch({ type: VOUCHER_PENDING, payload: true });
        const { data } = await api.fetchPublishedVouchers();
        dispatch({ type: FETCH_PUBLISHED_VOUCHER, payload: data })
        dispatch({ type: VOUCHER_PENDING, payload: false });
    } catch (error) {
        console.log(error.message)
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

export const publishVoucher = (id, action) => async (dispatch) => {
    try {
        console.log(id)
        dispatch({ type: VOUCHER_PENDING, payload: true });
        const { data } = await api.setVoucherPublish(id, action);
        dispatch({ type: PUBLISH_VOUCHER, payload: data });
        dispatch({ type: VOUCHER_PENDING, payload: false });
    } catch (error) {
        console.log(error.message)
    }
}

export const signin = (formData, history, previousPath) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.signInAdmin(formData);
        dispatch({ type: AUTH_ADMIN, data });
        dispatch({ type: USER_LOADING, payload: false });
        /* 
        If previous path exists, then redirect to previous path.
        If not, redirect to home page.
        Note:
            set action equal to 0 to set default tab when redirect to profile page.
         */
        previousPath
            ? history.push(`${previousPath}`, { action: 0 })
            : history.push('/dashboard/admin');
    } catch (error) {
        dispatch({ type: USER_LOADING, payload: false });
        console.log(error);
    }
};

export const checkCurrentAdmin = (history) => async (dispatch) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
        /*Check user profile in local storage to get user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set state null and redirec to homepage
         */
        if (admin) {
            dispatch({
                type: IS_ADMIN_CHECKING,
                payload: true,
            });
            const { data } = await api.checkCurrentAdmin();
            dispatch({
                type: CHECK_CURRENT_ADMIN,
                data: { result: data.result, token: admin.token },
            });
            dispatch({
                type: IS_ADMIN_CHECKING,
                payload: false,
            });
        } else {
            dispatch({ type: CHECK_CURRENT_ADMIN, data: null });
            dispatch({
                type: IS_ADMIN_CHECKING,
                payload: false,
            });
        }
    } catch (error) {
        console.log(error.message)
        const previousPath = history.location.pathname;
        dispatch({ type: CHECK_CURRENT_ADMIN, data: null });
        dispatch({
            type: IS_ADMIN_CHECKING,
            payload: false,
        });
        // previousPath === '/'
        //     ? history.push('/dashboard/admin')
        //     : history.push('/admin/login', { previousPath });
    }
};