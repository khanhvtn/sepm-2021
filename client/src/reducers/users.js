import { FETCH_ALL } from '../constants/actionTypes';

const userReducer = (data = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        default:
            return data;
    }
};
export default userReducer;