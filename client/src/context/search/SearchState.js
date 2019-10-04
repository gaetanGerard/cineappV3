import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import SearchReducer from './searchReducer';
import { SEARCH_QUERY, SET_LOADING, RESET_REDIRECT, REDIRECT_FROM_SEARCH } from '../types';

const SearchState = props => {
    const initialState = {
        loading: false,
        redirect: false,
        searchQuery: {}
    };

    const [ state, dispatch] = useReducer(SearchReducer, initialState);


    /* Search for a movie, series or person from the api */
    const search = async (text, page = 1) => {
        setLoading();
        setRedirection();

        const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&query=${text}&page=${page}&include_adult=false`);

        dispatch({
            type: SEARCH_QUERY,
            payload: res.data
        });
    };

    /* reset redirection */
    const resetRedirection = () => dispatch({type: RESET_REDIRECT});

    /* set redirect back to false */
    const setRedirection = () => dispatch({type: REDIRECT_FROM_SEARCH});

    // Set loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return <SearchContext.Provider
        value={{
           searchQuery: state.searchQuery,
           redirect: state.redirect,
           search,
           resetRedirection
        }}>
            {props.children}
    </SearchContext.Provider>
}

export default SearchState;