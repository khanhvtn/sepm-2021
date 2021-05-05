import {FETCH_ALL_CODE, CREATE_CODE, DELETE_CODE} from '../constants/actionTypes'

const initialState = {
    allCodes: [],
    isLoading: false
}

const codeReducer = (codes = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_CODE:
            return { ...codes, allCodes: action.payload }
        case CREATE_CODE:
            return { ...codes, allCodes: action.payload };
        case DELETE_CODE:
            return {...codes, allCodes: action.payload}
        default:
            return codes;
    }
}

export default codeReducer;
