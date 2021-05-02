import * as api from '../api';
import { CREATE_LINK, LINK_PENDING, ACCESS_LINK, LINK_NOT_FOUND } from '../constants/actionTypes';
import Cookies from 'universal-cookie'
import uuid from 'react-uuid'

export const createShareLink = (voucherId) => async (dispatch) => {
    console.log("Voucher Id from ACTION:", voucherId)

    try {
        dispatch({ type: LINK_PENDING, payload: true });
        const { data } = await api.createShareLink(voucherId);
        console.log(data.message)
        dispatch({ type: CREATE_LINK, payload: data });
        dispatch({ type: LINK_PENDING, payload: false });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: LINK_PENDING, payload: false });
    }
};

export const accessLink = (linkId, userId) => async (dispatch) => {
    const cookies = new Cookies();

    if (!cookies.get('__track')) {
        cookies.set('__track', uuid())
    }

    const clientToken = cookies.get('__track');

    console.log("Client Token: ", clientToken)
    console.log("Link ID:", linkId)
    console.log("userId: ", userId)

    try {
        dispatch({ type: LINK_PENDING, payload: true });
        const guest = await api.trackUser({ clientToken: clientToken });
        const { data } = await api.accessLink(linkId, { validGuest: guest.data.validGuest, userId: userId });
        console.log(data.message)
        dispatch({ type: ACCESS_LINK, payload: data });
        dispatch({ type: LINK_PENDING, payload: false });
    } catch (error) {
        console.log(error.message)
        dispatch({ type: LINK_PENDING, payload: false });
        dispatch({ type: LINK_NOT_FOUND, payload: true });
    }
}