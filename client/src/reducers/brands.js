import { CREATE, DELETE, FETCH_ALL_BRAND, BRAND_PENDING, GET_BRAND_SPECIFC } from '../constants/actionTypes';

const initialState = {
    brands: [],
    brand: [],
    isLoading: false
}

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_BRAND:
            return { ...state, brands: action.payload };
        case GET_BRAND_SPECIFC:
            return{...state, brand: action.payload}
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