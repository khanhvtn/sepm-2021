import {
    AUTH,
    LOGOUT,
    CHECK_CURRENT_USER,
    UPDATE_USER,
    IS_SUCCESS_PURCHASE
} from '../constants/actionTypes';

const authReducer = (state = { authData: null, isSuccessPurchase : false}, action) => {
    switch (action.type) {
        case AUTH:
            //Save user token into local storage and update state
            localStorage.setItem(
                'userProfile',
                JSON.stringify({
                    token: action?.data.token,
                })
            );
            return { ...state, authData: action?.data };
        case LOGOUT:
            //clear local storage and update state to null
            localStorage.clear();
            return { ...state, authData: null };
        case UPDATE_USER:
            return {
                ...state,
                authData: { ...state.authData, result: action?.data },
            };
        case CHECK_CURRENT_USER:
            //Save user token into local storage and update new information for state
            if (action?.data) {
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify({
                        token: action?.data.token,
                    })
                );
                return { ...state, authData: action?.data };
            } else {
                //clear local storage and update state to null
                localStorage.clear();
                return { ...state, authData: action?.data };
            }
            case IS_SUCCESS_PURCHASE:
                return {
                    ...state,
                    isSuccessPurchase: action.payload
                };
        default:
            return state;
    }
};

export default authReducer;
