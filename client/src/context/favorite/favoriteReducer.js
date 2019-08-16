import {
    ADD_FAVORITE,
    DELETE_FAVORITE,
    UPDATE_FAVORITE,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_FAVORITE,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return {
                ...state,
                favorite: [...state.favorite, action.payload]
            };
        default:
            return state;
    }
}