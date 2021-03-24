import { FETCH_ALL, DELETE } from '../constants/actionTypes';

const userReducer = (users = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
            return users.filter((user) => user._id !== action.payload);
        default:
            return users;
    }
};
export default userReducer;