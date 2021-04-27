import { ACCESS_LINK, CREATE_LINK, LINK_PENDING, TRACK_USER, LINK_NOT_FOUND } from '../constants/actionTypes';

const initialState = {
    linkId: null,
    publishVoucher: [],
    isLoading: false,
    validGuest: null,
}

const linkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LINK_NOT_FOUND:
            return { ...state, publishVoucher: { expiredLink: action.payload } }
        case TRACK_USER:
            return { ...state, validGuest: action.payload }
        case ACCESS_LINK:
            return { ...state, publishVoucher: action.payload }
        case CREATE_LINK:
            return { ...state, linkId: action.payload };
        case LINK_PENDING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
export default linkReducer;