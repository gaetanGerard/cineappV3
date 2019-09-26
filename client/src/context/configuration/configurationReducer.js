import {
    GENRES_NAME,
    LANGUAGES_NAME,
    COUNTRIES_NAME,
    SERIES_GENRES_NAME
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LANGUAGES_NAME:
            return {
                ...state,
                languagesName: action.payload
            };
        case GENRES_NAME:
            return {
                ...state,
                genresName: action.payload
            };
        case SERIES_GENRES_NAME:
            return {
                ...state,
                genresSeriesName: action.payload
            };
        case COUNTRIES_NAME:
            return {
                ...state,
                countriesName: action.payload
            };
        default:
            return state;
    }
}