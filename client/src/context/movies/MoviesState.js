import React, { useReducer } from 'react';
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
    SET_LOADING,
    GET_MOVIES_BY_GENRE
} from '../types';

const MoviesState = (props) => {
    const initialState = {
        movie: {},
        collection: {},
        listOfMoviesByGenre: {},
        loading: true,
        discoverMovie: {},
        castRows: {},
        crewRows: {},
        recommendations: {}
    };

    const [state, dispatch] = useReducer(MoviesReducer, initialState);


    /* Get a list of discover Movie */
    const fetchDiscoverMovies = async () => {
        const today = Date.now();

        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&region=FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${today}`);
        dispatch({
            type: GET_DISCOVER_MOVIE,
            payload: res.data.results
        });
    };

    /* Get a specific movie with the id */
    const fetchMovie = async movieId => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&api_key=59c76c5b0623517c046a93a7c472e779`);
        dispatch({
            type: GET_MOVIE,
            payload: res.data
        });
    };

    /* Get Crew related to a movie */
    const fetchCrew = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=59c76c5b0623517c046a93a7c472e779`);
        dispatch({
            type: GET_CREW,
            payload: res.data.crew
        });
    };

    /* Get Cast related to a movie */
    const fetchCast = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=59c76c5b0623517c046a93a7c472e779`);
        dispatch({
            type: GET_CAST,
            payload: res.data.cast
        });
    };

    /* Get Collection related to a movie */
    const fetchCollection = async collectionId => {
        const res = await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR`);
        dispatch({
            type: GET_COLLECTION,
            payload: res.data
        });
    };

    /* Get Recommendation */
    const fetchRecommendation = async movieId => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&api_key=59c76c5b0623517c046a93a7c472e779`);
        dispatch({
            type: GET_RECOMMENDATIONS,
            payload: res.data.results
        });
    };

    /* Get a movie list by genre */
    const fetchMoviesListByGenre = async (genreId, page = 1) => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&page=${page}&with_genres=${genreId}`);
        dispatch({
            type: GET_MOVIES_BY_GENRE,
            payload: res.data
        })
    };

    /* SET Loading */
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <MoviesContext.Provider
        value={{
            listOfMoviesByGenre: state.listOfMoviesByGenre,
            discoverMovie: state.discoverMovie,
            movie: state.movie,
            collection: state.collection,
            castRows: state.castRows,
            crewRows: state.crewRows,
            recommendations: state.recommendations,
            loading: state.loading,
            fetchDiscoverMovies,
            fetchCrew,
            fetchCast,
            fetchRecommendation,
            fetchMovie,
            fetchCollection,
            fetchMoviesListByGenre,
        }}>
            { props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesState;