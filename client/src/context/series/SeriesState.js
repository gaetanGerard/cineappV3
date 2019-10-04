import React, { useReducer } from 'react';
import axios from 'axios';
import SeriesContext from './seriesContext';
import SeriesReducer from './seriesReducer';
import {
    GET_DISCOVER_SERIES,
    GET_SERIE,
    GET_SEASON_DETAIL,
    GET_SERIES_RECOMMENDATIONS,
    GET_SERIES_BY_GENRE,
    SET_LOADING,
} from '../types';

const SeriesState = props => {
    const initialState = {
        discoverSerie: {},
        serie: {},
        season: {},
        serieRecommendations: {},
        listOfSeriesByGenre: {},
        loading: true,
    };

    const [state, dispatch] = useReducer(SeriesReducer, initialState);

    /* Get a list of discover Movie */
    const fetchDiscoverSeries = async () => {
        setLoading();
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/tv/on_the_air?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&page=1`);
        dispatch({
            type: GET_DISCOVER_SERIES,
            payload: res.data.results
        });
    };

    /* Get a serie with the serie id */
    const fetchSerie = async seriesId => {
        setLoading();
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/tv/${seriesId}?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR`);
        dispatch({
            type: GET_SERIE,
            payload: res.data
        });
    };

    /* Get a serie season detail and credit */
    const fetchSeason = async (seriesId, seasonNumber = 1) => {
        setLoading();
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&append_to_response=credits`);
        dispatch({
            type: GET_SEASON_DETAIL,
            payload: res.data
        });
    };

    /* Get a list of recommended series for the actual series */
    const fetchSeriesRecommendation = async seriesId => {
        setLoading();

        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/tv/${seriesId}/recommendations?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&page=1`);
        dispatch({
            type: GET_SERIES_RECOMMENDATIONS,
            payload: res.data.results
        });
    };

    /* Get a series list by genre */
    const fetchSeriesListByGenre = async (genreSeriesId, page = 1, originalLanguage = "en") => {
        setLoading();

        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/tv?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&sort_by=popularity.desc&page=${page}&with_genres=${genreSeriesId}&with_original_language=${originalLanguage}&include_null_first_air_dates=false&timezone=Europe%2FParis&vote_count.gte=3`);
        dispatch({
            type: GET_SERIES_BY_GENRE,
            payload: res.data
        })
    };


    /* SET Loading */
    const setLoading = () => dispatch({type: SET_LOADING});



    return (
        <SeriesContext.Provider
        value={{
            discoverSerie: state.discoverSerie,
            serie: state.serie,
            season: state.season,
            serieRecommendations: state.serieRecommendations,
            listOfSeriesByGenre: state.listOfSeriesByGenre,
            loading: state.loading,
            fetchDiscoverSeries,
            fetchSerie,
            fetchSeason,
            fetchSeriesRecommendation,
            fetchSeriesListByGenre
        }}>
            {props.children}
        </SeriesContext.Provider>
    );
};

export default SeriesState;