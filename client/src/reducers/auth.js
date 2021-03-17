import { AUTH, LOGOUT, CHECKUSERLOGIN } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //Save user info in local storage and update state
            console.log(action);
            localStorage.setItem(
                'userProfile',
                JSON.stringify({
                    id: action?.data.result._id,
                    token: action?.data.token,
                })
            );
            return { ...state, authData: action?.data };
        case LOGOUT:
            //clear local storage and update state to null
            localStorage.clear();
            return { ...state, authData: null };
        case CHECKUSERLOGIN:
            //update new information for user local storage
            if (action?.data) {
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify({
                        id: action?.data.result._id,
                        token: action?.data.token,
                    })
                );
            }
            return { ...state, authData: action?.data };
        default:
            return state;
    }
};

export default authReducer;
