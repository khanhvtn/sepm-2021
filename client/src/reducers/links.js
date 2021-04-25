import { ACCESS_LINK, CREATE_LINK, LINK_PENDING } from '../constants/actionTypes';

const initialState = {
    linkId: null,
    publishVoucher: [],
    isLoading: false,
}

const linkReducer = (state = initialState, action) => {
    switch (action.type) {
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