import React, { useContext, useEffect, useState } from 'react';
import SeriesContext from '../../context/series/seriesContext';

const Seasons = ({ match }) => {
    const seriesContext = useContext(SeriesContext);

    const {
        serie,
    } = seriesContext;

    const seriesId = match.params.seriesId;


    return (
        <div>
            <ul>
                {serie.seasons !== undefined ? serie.seasons.map(item => (
                    <li>{item.name}</li>
                )) : null}
            </ul>
        </div>
    )
}

export default Seasons
