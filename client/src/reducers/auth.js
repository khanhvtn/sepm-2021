import {
    AUTH_USER,
    AUTH_ADMIN,
    AUTH_BRAND,
    LOGOUT,
    CHECK_CURRENT_USER,
    CHECK_CURRENT_ADMIN,
    CHECK_CURRENT_BRAND,
    UPDATE_USER,
    UPDATE_BRAND,
    USER_LOADING,
    IS_USER_CHECKING,
    USER_WIN_GAME,
    IS_SUCCESS_PURCHASE,
    IS_ADMIN_CHECKING,
    IS_BRAND_CHECKING
} from '../constants/actionTypes';

const initialState = {
    authData: null,
    adminData: null,
    brandData: null,
    isSuccessPurchase: false,
    isUserChecking: true,
    isAdminChecking: true,
    isBrandChecking: true,
    isLoading: false
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
        case AUTH_BRAND:
            //Save user token into local storage and update state
            localStorage.setItem(
                'brandProfile',
                JSON.stringify({
                    token: action?.data.token,
                })
            );
            return { ...state, brandData: action?.data };
        case LOGOUT:
            //clear local storage and update state to null
            localStorage.clear();
            return { ...state, authData: null, adminData: null, brandData: null };
        case USER_WIN_GAME:
        case UPDATE_USER:
            return {
                ...state,
                authData: { ...state.authData, result: action?.data },
            };
        case UPDATE_BRAND:
            return {
                ...state,
                brandData: { ...state.brandData, result: action?.data },
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
        case IS_ADMIN_CHECKING:
            return {
                ...state,
                isAdminChecking: action.payload,
            };
        case IS_BRAND_CHECKING:
            return {
                ...state,
                isBrandChecking: action.payload,
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
        case CHECK_CURRENT_BRAND:
            //Save user token into local storage and update new information for state
            if (action?.data) {
                localStorage.setItem(
                    'brandProfile',
                    JSON.stringify({
                        token: action?.data.token,
                    })
                );
                return { ...state, brandData: action?.data };
            } else {
                //clear local storage and update state to null
                //localStorage.clear();
                return { ...state, brandData: action?.data };
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
