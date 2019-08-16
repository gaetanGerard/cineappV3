import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import {
    GET_CAST,
    GET_COLLECTION,
    GET_CREW,
    GET_MOVIE,
    GET_RECOMMENDATIONS,
    GET_DISCOVER_MOVIE,
    SET_LOADING
} from '../types';

const MoviesState = (props) => {
    const initialState = {
        movie: {},
        loading: true,
        discoverMovie: {},
        castRows: {},
        crewRows: {},
        recommendations: {}
    };

    const [state, dispatch] = useReducer(MoviesReducer, initialState);

    /* Get a list of discover Movie */
    const fetchDiscoverMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
        dispatch({
            type: GET_DISCOVER_MOVIE,
            payload: res.data.results
        });
    };

    /* Get a specific movie with the id */
    const fetchMovie = async movieId => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: GET_MOVIE,
            payload: res.data
        });
    };

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

    /* SET Loading */

    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <MoviesContext.Provider
        value={{
            discoverMovie: state.discoverMovie,
            movie: state.movie,
            castRows: state.castRows,
            crewRows: state.crewRows,
            recommendations: state.recommendations,
            loading: state.loading,
            fetchDiscoverMovies,
            fetchCrew,
            fetchCast,
            fetchRecommendation,
            fetchMovie
        }}>
            { props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesState;