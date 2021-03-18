import { CREATE, DELETE, UPDATE, FETCH_ALL } from '../constants/actionTypes';

const brandReducer = (brands = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...brands, action.payload];
        case UPDATE:
            return brands.map((brand) =>
                brand._id === action.payload._id ? action.payload : brand
            );
        case DELETE:
            return brands.filter((brand) => brand._id !== action.payload);
        default:
            return brands;
    }
};
export default brandReducer;