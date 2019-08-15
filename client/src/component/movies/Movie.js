import React from 'react';

const Movie = ({ match }) => {

    const movieId = match.params.movieId;

    return (
        <div>
            <h1>Bienvenu sur {movieId}</h1>
        </div>
    )
}

export default Movie
