import {
    GET_DISCOVER_SERIES
} from '../types';

export default ( state, action ) => {
    switch (action.type) {
        case GET_DISCOVER_SERIES:
            return {
                ...state,
                discoverSerie: action.payload
            };
        default:
            return state;
    }
}