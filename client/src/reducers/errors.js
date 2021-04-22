import { ERROR, CLEAR_ERROR } from '../constants/actionTypes';
const errorReducer = (state = { errors: null }, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, errors: action.payload };
        case CLEAR_ERROR:
            return { ...state, errors: null };
        default:
            return state;
    }
};

export default errorReducer;
