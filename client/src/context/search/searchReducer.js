import {
    SEARCH_QUERY,
    SET_LOADING,
    REDIRECT_FROM_SEARCH,
    RESET_REDIRECT
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return {
                ...state,
                loading: false,
                searchQuery: action.payload
            };
        case RESET_REDIRECT:
            return {
                ...state,
                redirect: false
            };
        case REDIRECT_FROM_SEARCH:
            return {
                ...state,
                redirect: true
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}