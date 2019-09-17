import {
    GET_DISCOVER_SERIES,
    SET_LOADING,
    GET_SERIE,
    GET_SERIES_RECOMMENDATIONS,
    GET_SEASON_DETAIL,
    GET_SERIES_BY_GENRE
} from '../types';

export default ( state, action ) => {
    switch (action.type) {
        case GET_DISCOVER_SERIES:
            return {
                ...state,
                discoverSerie: action.payload,
                loading: false
            };
        case GET_SERIE:
            return {
                ...state,
                serie: action.payload,
                loading: false
            };
        case GET_SEASON_DETAIL:
            return {
                ...state,
                season: action.payload,
                loading: false
            };
        case GET_SERIES_RECOMMENDATIONS:
            return {
                ...state,
                serieRecommendations: action.payload,
                loading: false
            };
        case GET_SERIES_BY_GENRE:
            return {
                ...state,
                listOfSeriesByGenre: action.payload,
                loading: false
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