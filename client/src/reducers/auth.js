import {
    AUTH,
    LOGOUT,
    CHECK_CURRENT_USER,
    UPDATE_USER,
    USER_LOADING,
    IS_USER_CHECKING,
} from '../constants/actionTypes';

const authReducer = (
    state = { isUserChecking: true, isLoading: false, authData: null },
    action
) => {
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
        case USER_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case IS_USER_CHECKING:
            return {
                ...state,
                isUserChecking: action.payload,
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
        default:
            return state;
    }
};

export default authReducer;
