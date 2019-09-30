import React, { useReducer } from 'react';
import uuid from 'uuid';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    FILTER_USER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER
} from '../types';

const AuthState = (props) => {
    const initialState = {
        users: [
            {
                id: 1,
                fname: "Gaétan",
                lname: "Gérard",
                pseudo: "SilverGraphik",
                email: "gaetangerard@msn.com",
                phone: "0471780501",
                password: "azerty"
            },
            {
                id: 2,
                fname: "Intira",
                lname: "Gérard",
                pseudo: "DG123",
                email: "DG@msn.com",
                phone: "123456789",
                password: "azerty"
            },
            {
                id: 3,
                fname: "Maddie",
                lname: "Gérard",
                pseudo: "MG123",
                email: "MG@msn.com",
                phone: "9987654321",
                password: "azerty"
            }
        ]
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    /* ADD User */
    const addUser = user => {
        user.id = uuid.v4();
        dispatch({ type: ADD_USER, payload: user });
    };

    /* DELETE User */
    const deleteUser = id => {
        dispatch({ type: DELETE_USER, payload: id });
    };

    /* SET_CURRENT User */

    /* CLEAR_CURRENT User */

    /* UPDATE User */

    /* FILTER User */

    /* CLEAR_FILTER User */


    return (
        <AuthContext.Provider
            value={{
                users: state.users,
                addUser,
                deleteUser
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;