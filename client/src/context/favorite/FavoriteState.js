import React, { useReducer } from 'react';
import axios from 'axios';
import FavoriteContext from './favoriteContext';
import FavoriteReducer from './favoriteReducer';
import {
    GET_FAVORITE,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    FAVORITE_ERROR,
    CLEAR_FAVORITE
} from '../types';

const FavoriteState = props => {
    const initialState = {
        favorite: null,
        error: null
    };

    const [state, dispatch] = useReducer(FavoriteReducer, initialState);

    /* Get Favorite */
    const getFavorite = async () => {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com//back/favorite');

            dispatch({
                type: GET_FAVORITE,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FAVORITE_ERROR,
                payload: err.response.msg
            });
        }
    };

    /* Add Favorite */
    const addFavorite = async favorite => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('https://cors-anywhere.herokuapp.com//back/favorite', favorite, config);
            dispatch({
                type: ADD_FAVORITE, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({
                type: FAVORITE_ERROR,
                payload: err.response.msg
            });
        }
        

    };

    /* Delete Favorite */
    const deleteFavorite = async id => {
        try {
            await axios.delete(`https://cors-anywhere.herokuapp.com//back/favorite/${id}`);
            
            dispatch({
                type: DELETE_FAVORITE, 
                payload: id 
            });
        } catch (err) {
            dispatch({
                type: FAVORITE_ERROR,
                payload: err.response.msg
            });
        }
    };

    /* Clear Favorite */
    const clearFavorite = () => {
        dispatch({type: CLEAR_FAVORITE});
    };

    return (
        <FavoriteContext.Provider
        value={{
            favorite: state.favorite,
            error: state.error,
            getFavorite,
            addFavorite,
            deleteFavorite,
            clearFavorite
        }}>
            { props.children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteState;