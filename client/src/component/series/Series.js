import React, { useContext, useEffect, useState } from 'react';
import SeriesContext from '../../context/series/seriesContext';
import FavoriteContext from '../../context/favorite/favoriteContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import SeriesItem from './SeriesItem';


const Series = ({ match }) => {
    const seriesContext = useContext(SeriesContext);
    const favoriteContext = useContext(FavoriteContext);
    const configurationContext = useContext(ConfigurationContext);

    // pull function and state out of the context
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

    const { favorite } = favoriteContext;

    // creation of state component
    const [seriesCast, setSeriesCast] = useState([]);
    const [seriesCrew, setSeriesCrew] = useState([]);

    // set the serie id and season number get from the url into variable
    const seriesId = match.params.seriesId;
    const seasonNumber = serie.number_of_seasons;

    // fetch series, season and recommendation from context
    // watch for any change of the serie id and the season
    useEffect(() => {
        fetchSerie(seriesId);
        fetchSeason(seriesId, seasonNumber);
        fetchSeriesRecommendation(seriesId);

        // eslint-disable-next-line
    }, [seriesId, seasonNumber]);

    // fetch credit from the context
    // watch for change into the season.credits
    useEffect(() => {
        if(season.credits !== undefined) {
            setSeriesCast(season.credits.cast);
            setSeriesCrew(season.credits.crew); 
        }

        // eslint-disable-next-line
    }, [season.credits]);

    // limit the cast of the first 5 into the cast
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
                favoriteI={favorite}
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
