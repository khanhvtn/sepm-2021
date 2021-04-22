import {
    AUTH_USER,
    AUTH_ADMIN,
    LOGOUT,
    CHECK_CURRENT_USER,
    CHECK_CURRENT_ADMIN,
    UPDATE_USER,
} from '../constants/actionTypes';

const initialState = {
    authData: null,
    adminData: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            //Save user token into local storage and update state
            localStorage.setItem(
                'userProfile',
                JSON.stringify({
                    token: action?.data.token,
                })
            );
            return { ...state, authData: action?.data };
        case AUTH_ADMIN:
            //Save user token into local storage and update state
            localStorage.setItem(
                'admin',
                JSON.stringify({
                    token: action?.data.token,
                })
            );
            return { ...state, adminData: action?.data };
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
                //localStorage.clear();
                return { ...state, authData: action?.data };
            }

        case CHECK_CURRENT_ADMIN:
            //Save user token into local storage and update new information for state
            if (action?.data) {
                localStorage.setItem(
                    'admin',
                    JSON.stringify({
                        token: action?.data.token,
                    })
                );
                return { ...state, adminData: action?.data };
            } else {
                //clear local storage and update state to null
                //localStorage.clear();
                return { ...state, adminData: action?.data };
            }
        default:
            return state;
    }
};

export default authReducer;
