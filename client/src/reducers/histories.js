import { CREATE, DELETE, UPDATE, FETCH_ALL } from '../constants/actionTypes';

const historyReducer = (histories = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
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
