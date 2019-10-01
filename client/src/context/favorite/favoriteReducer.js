import {
    ADD_FAVORITE,
    DELETE_FAVORITE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite, action.payload],
            };
        case DELETE_FAVORITE:
                return {
                    ...state,
                    favorite: state.favorite.filter(fav => fav.id !== action.payload),
                };
        default:
            return state;
    }
}