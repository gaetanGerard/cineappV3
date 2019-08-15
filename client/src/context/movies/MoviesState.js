import React, { useReducer } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import {
    GET_CAST,
    GET_COLLECTION,
    GET_CREW,
    GET_MOVIE,
    GET_RECOMMENDATIONS
} from '../types';

const MoviesState = props => {
    const initialState = {
        castRows: {},
        crewRows: {},
        recommendations: {}
    };

    const [state, dispatch] = useReducer(MoviesReducer, initialState);

    /* Get Movie */

    /* Get Crew related to a movie */
    const fetchCrew = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: GET_CREW,
            payload: res.data.crew
        });
    };

    /* Get Cast related to a movie */
    const fetchCast = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: GET_CAST,
            payload: res.data.cast
        });
    };

    /* Get Collection related to a movie */

    /* Get Recommendation */
    const fetchRecommendation = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: GET_RECOMMENDATIONS,
            payload: res.data.results
        });
    };



    return (
        <MoviesContext.Provider
        value={{
            castRows: state.castRows,
            crewRows: state.crewRows,
            recommendations: state.recommendations,
            fetchCrew,
            fetchCast,
            fetchRecommendation
        }}>
            { props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesState;