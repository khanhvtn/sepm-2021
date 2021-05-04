import { CREATE, DELETE, FETCH_ALL_BRAND, BRAND_PENDING } from '../constants/actionTypes';

const initialState = {
    brands: [],
    isLoading: false
}

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_BRAND:
            return { ...state, brands: action.payload };
        case BRAND_PENDING:
            return { ...state, isLoading: action.payload }
        case CREATE:
            return [...state, action.payload];
        case DELETE:
            return state.filter((brand) => brand._id !== action.payload);
        default:
            return state;
    }
};
export default brandReducer;