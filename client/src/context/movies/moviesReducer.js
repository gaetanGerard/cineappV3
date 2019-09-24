import {
    GET_CAST,
    GET_COLLECTION,
    GET_CREW,
    GET_MOVIE,
    GET_RECOMMENDATIONS,
    GET_DISCOVER_MOVIE,
    SET_LOADING,
    GET_MOVIES_BY_GENRE
} from '../types';

export default ( state, action ) => {
    switch (action.type) {
        case GET_DISCOVER_MOVIE:
            return {
                ...state,
                discoverMovie: action.payload
            };
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            };
        case GET_MOVIES_BY_GENRE:
            return {
                ...state,
                listOfMoviesByGenre: action.payload,
                loading: false
            };
        case GET_COLLECTION:
            return {
                ...state,
                collection: action.payload,
                loading: false
            }
        case GET_CAST:
            return {
                ...state,
                castRows: action.payload
            };
        case GET_CREW:
            return {
                ...state,
                crewRows: action.payload
            };
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.payload
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