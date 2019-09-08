import {
    GET_PEOPLE_DETAIL,
    GET_PEOPLE_COMBINED_CREDITS,
    SET_LOADING
} from '../types';

export default ( state, action ) => {
    switch (action.type) {
        case GET_PEOPLE_DETAIL:
            return {
                ...state,
                peopleDetail: action.payload,
                loading: false
            };
        case GET_PEOPLE_COMBINED_CREDITS:
            return {
                ...state,
                peopleCombinedCredit: action.payload,
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