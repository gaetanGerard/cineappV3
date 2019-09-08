import React, { useReducer } from 'react';
import axios from 'axios';
import SeriesContext from './seriesContext';
import SeriesReducer from './seriesReducer';
import {
    GET_DISCOVER_SERIES,
    SET_LOADING,
} from '../types';

const SeriesState = props => {
    const initialState = {
        discoverSerie: {},
    };

    const [state, dispatch] = useReducer(SeriesReducer, initialState);

    /* Get a list of discover Movie */
    const fetchDiscoverSeries = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&page=1`);
        dispatch({
            type: GET_DISCOVER_SERIES,
            payload: res.data.results
        });
    };



    return (
        <SeriesContext.Provider
        value={{
            discoverSerie: state.discoverSerie,
            fetchDiscoverSeries,
        }}>
            { props.children}
        </SeriesContext.Provider>
    );
};

export default SeriesState;