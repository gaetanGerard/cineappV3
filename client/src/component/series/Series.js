import React, { useContext, useEffect, useState } from 'react';
import SeriesContext from '../../context/series/seriesContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import SeriesItem from './SeriesItem';


const Series = ({ match }) => {
    const [seriesCast, setSeriesCast] = useState([]);
    const [seriesCrew, setSeriesCrew] = useState([]);

    const seriesContext = useContext(SeriesContext);
    const configurationContext = useContext(ConfigurationContext);

    const {
        loading,
        serie,
        season,
        serieRecommendations,
        fetchSerie,
        fetchSeason,
        fetchSeriesRecommendation
    } = seriesContext;

    const {
        languagesName,
        countriesName
    } = configurationContext;

    const seriesId = match.params.seriesId;
    const seasonNumber = serie.number_of_seasons;

    useEffect(() => {
        fetchSerie(seriesId);
        fetchSeason(seriesId, seasonNumber);
        fetchSeriesRecommendation(seriesId);

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [seriesId, seasonNumber]);


    useEffect(() => {
        if(season.credits !== undefined) {
            setSeriesCast(season.credits.cast);
            setSeriesCrew(season.credits.crew); 
        }

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [season.credits]);

    const getCreditCast = castRows => {
        let cast = [];
        if (castRows.length > 0) {
            for (let i = 0; i < 5; i++) {
                cast.push(castRows[i]);
            }
        }
        return cast;
    };

    return (
        <div>
            <SeriesItem 
                serie={serie}
                loading={loading}
                season={season}
                crew={seriesCrew}
                cast={getCreditCast(seriesCast)}
                recommendations={serieRecommendations}
                languagesName={languagesName}
                countriesName={countriesName}
            />
        </div>
    )
}

export default Series
