import React, { useReducer } from 'react';
import axios from 'axios';
import SeriesContext from './seriesContext';
import SeriesReducer from './seriesReducer';
import {
    GET_DISCOVER_SERIES
} from '../types';

const SeriesState = props => {
    const initialState = {
        discoverSerie: {},
    };

    const [state, dispatch] = useReducer(SeriesReducer, initialState);

    /* Get a list of discover Movie */
    const fetchDiscoverSeries = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);
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