import React, { useContext, useEffect } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import FavoriteContext from '../../context/favorite/favoriteContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import MovieItem from './MovieItem';

const Movie = ({match}) => {

    const moviesContext = useContext(MoviesContext);
    const favoriteContext = useContext(FavoriteContext);
    const configurationContext = useContext(ConfigurationContext);

    const { favorite } = favoriteContext;
    const {
        movie,
        loading,
        castRows, 
        crewRows,
        recommendations,
        fetchCrew, 
        fetchCast,
        fetchRecommendation,
        fetchMovie,
    } = moviesContext;

    const {
        languagesName,
    } = configurationContext;

    const movieId = match.params.movieId;

    useEffect(() => {

        fetchMovie(movieId);
        fetchCrew(movieId);
        fetchCast(movieId);
        fetchRecommendation(movieId);

        // eslint-disable-next-line
    }, [movieId]); // permet de rester à l'écoute de changement du favoriteId
    

    /* Get the 4 first crew member of a movie and save it inside an array */
    const getCreditCrew = crewRows => {
        let crew = [];
        if (crewRows.length > 0) {
            for (let i = 0; i < 4; i++) {
                crew.push(crewRows[i]);
            }
        }
        return crew;
    };

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
            <MovieItem
                favorite={favorite}
                movie={movie}
                loading={loading}
                movieCreditCrew={getCreditCrew(crewRows)}
                movieCreditCast={getCreditCast(castRows)}
                recommendations={recommendations}
                languagesName={languagesName}
            />
        </div>
    )
}

export default Movie
