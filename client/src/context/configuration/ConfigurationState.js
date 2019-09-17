import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import ConfigurationContext from './configurationContext';
import ConfigurationReducer from './configurationReducer';
import {
    GENRES_NAME,
    LANGUAGES_NAME,
    COUNTRIES_NAME
} from '../types';

const ConfigurationState = (props) => {
    const initialState = {
        genresName: null,
        languagesName: null,
        countriesName: null
    };

    const [state, dispatch] = useReducer(ConfigurationReducer, initialState);

    /* Get the list of genres name */
    const fetchGenresName = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
        dispatch({
            type: GENRES_NAME,
            payload: res.data.genres
        });
    };

    /* Get the list of language name */
    const fetchLanguagesName = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: LANGUAGES_NAME,
            payload: res.data
        });
    };

    /* Get the list of countries */
    const fetchCountriesName = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        dispatch({
            type: COUNTRIES_NAME,
            payload: res.data
        });
    };

    useEffect(() => {
        fetchGenresName();
        fetchLanguagesName();
        fetchCountriesName();
    }, []);

    return (
        <ConfigurationContext.Provider
            value={{
                genresName: state.genresName,
                languagesName: state.languagesName,
                countriesName: state.countriesName
            }}
        >
            { props.children}
        </ConfigurationContext.Provider>
    )
};

export default ConfigurationState;