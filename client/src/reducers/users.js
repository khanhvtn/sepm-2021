import { FETCH_ALL, DELETE, USER_PENDING } from '../constants/actionTypes';

const initialState = {
    users: [],
    isLoading: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, users: action.payload };
        case USER_PENDING:
            return { ...state, isLoading: action.payload };
        case DELETE:
            return state.filter((user) => user._id !== action.payload);
        default:
            return state;
    }
};
export default userReducer;