import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    FILTER_USER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            };
        default:
            return state;
    }
}


// udemy set & clear current contact chapter