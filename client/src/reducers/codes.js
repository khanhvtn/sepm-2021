import {FETCH_ALL_CODE} from '../constants/actionTypes'

const initialState = {
    allCodes: [],
    isLoading: false
}

const codeReducer = (codes = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_CODE:
            return { ...codes, allCodes: action.payload }
        case CREATE:
            return { ...codes, allCodes: action.payload };
        default:
            codes;
    }
}

export default codeReducer;
