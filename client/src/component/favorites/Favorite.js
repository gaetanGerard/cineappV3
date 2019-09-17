import React, { useContext, useEffect } from 'react';
import FavoriteContext from '../../context/favorite/favoriteContext';
import MoviesContext from '../../context/movies/moviesContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import FavoriteItem from './FavoriteItem';

const Favorite = ({ match }) => {

    const favoriteContext = useContext(FavoriteContext);
    const moviesContext = useContext(MoviesContext);
    const configurationContext = useContext(ConfigurationContext);

    const { favorite } = favoriteContext;
    const { 
        castRows, 
        crewRows,
        recommendations,
        fetchCrew, 
        fetchCast,
        fetchRecommendation
         } = moviesContext;

    const {
        languagesName,
    } = configurationContext;

    const movieId = match.params.movieId;

    useEffect(() => {

        fetchCrew(movieId);
        fetchCast(movieId);
        fetchRecommendation(movieId);

        // console.log(favoriteId);
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
            {favorite.map(favorite => (favorite.id === parseInt(movieId) ? 
            <FavoriteItem 
                favorite={favorite} 
                movieCreditCrew={getCreditCrew(crewRows)}
                movieCreditCast={getCreditCast(castRows)}
                recommendations={recommendations}
                languagesName={languagesName}
                key={favorite.id} 
            /> : null))}
        </div>
    )
}

export default Favorite
