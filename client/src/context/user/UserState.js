import React, { useReducer } from 'react';
import uuid from 'uuid';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';

const UserState = (props) => {
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
        ],
        current: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

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
    const setCurrent = user => {
        dispatch({ type: SET_CURRENT, payload: user });
    };

    /* CLEAR_CURRENT User */
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    /* UPDATE User */
    const updateUser = user => {
        dispatch({ type: UPDATE_USER, payload: user });
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                current: state.current,
                addUser,
                deleteUser,
                updateUser,
                setCurrent,
                clearCurrent
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;