import React, { useReducer } from 'react';
import axios from 'axios';
import PeopleContext from './peopleContext';
import PeopleReducer from './peopleReducer';
import {
    GET_PEOPLE_DETAIL,
    GET_PEOPLE_COMBINED_CREDITS,
    SET_LOADING
} from '../types';

const PeopleState = props => {
    const initialState = {
        peopleDetail: {},
        peopleCombinedCredit: {},
        loading: true,
    }

    const [state, dispatch] = useReducer(PeopleReducer, initialState);

    /* Fetch the actor passed in the url */
    const fetchPeopleDetail = async idPassedUrl => {
        setLoading();
        const res = await axios.get(`https://api.themoviedb.org/3/person/${idPassedUrl}?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR`);
        dispatch({
            type: GET_PEOPLE_DETAIL,
            payload: res.data
        });
    };

    /* Fetch the actors credits for his performance in series/movies/production/etc */
    const fetchPeopleCombinedCredits = async idPassedUrl => {
        setLoading();
        const res = await axios.get(`https://api.themoviedb.org/3/person/${idPassedUrl}/combined_credits?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR`);
        dispatch({
            type: GET_PEOPLE_COMBINED_CREDITS,
            payload: res.data
        });
    }

    /* SET Loading */
    const setLoading = () => dispatch({type: SET_LOADING});


    return (
        <PeopleContext.Provider
        value={{
            peopleDetail: state.peopleDetail,
            peopleCombinedCredit: state.peopleCombinedCredit,
            loading: state.loading,
            fetchPeopleDetail,
            fetchPeopleCombinedCredits
        }}>
            { props.children}
        </PeopleContext.Provider>
    );
};

export default PeopleState;