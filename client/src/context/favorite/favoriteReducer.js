import {
    GET_FAVORITE,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    FAVORITE_ERROR,
    CLEAR_FAVORITE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_FAVORITE:
            return {
                ...state,
                favorite: action.payload,
                loading: false
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite, action.payload],
                loading: false
            };
        case CLEAR_FAVORITE:
            return {
                ...state,
                favorite: null,
                error: null
            };
        case DELETE_FAVORITE:
                return {
                    ...state,
                    favorite: state.favorite.filter(fav => fav.id !== action.payload),
                    loading: false
                };
        case FAVORITE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}