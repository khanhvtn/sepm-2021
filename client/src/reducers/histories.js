import { CREATE_HISTORY, DELETE, UPDATE, FETCH_ALL, FETCH_HISTORIES } from '../constants/actionTypes';

const initialState = {
    histories: []
}


const historyReducer = (histories = initialState, action) => {
    switch (action.type) {
        case FETCH_HISTORIES:
            return {...histories, histories: action.payload};
        case CREATE_HISTORY:
            return [...histories, action.payload];
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
