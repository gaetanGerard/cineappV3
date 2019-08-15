import {
    GET_CAST,
    GET_COLLECTION,
    GET_CREW,
    GET_MOVIE,
    GET_RECOMMENDATIONS,
    GET_RELEASE_DATE
} from '../types';

export default ( state, action ) => {
    switch (action.type) {
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
        default:
            return state;
    }
}