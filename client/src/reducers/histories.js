import { CREATE_HISTORY, DELETE, UPDATE, FETCH_ALL, FETCH_HISTORIES, HISTORY_PENDING, IS_SUCCESS_BUY } from '../constants/actionTypes';

const initialState = {
    histories: [],
    isLoading: false,
    bought: false
}


const historyReducer = (histories = initialState, action) => {
    switch (action.type) {
        case FETCH_HISTORIES:
            return {...histories, histories: action.payload};
        case HISTORY_PENDING:
            return { ...histories, isLoading: action.payload};
        case CREATE_HISTORY:
            return {...histories, histories: action.payload, bought: true};
        case IS_SUCCESS_BUY:
            return {
                ...histories,
                bought: action.payload
                };
        case UPDATE:
            return histories.map((history) =>
                history._id === action.payload._id ? action.payload : history
            );
        case DELETE:
            return histories.filter((history) => history._id !== action.payload);
        default:
            return histories;
    }
};
export default historyReducer;
