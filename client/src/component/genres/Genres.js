import React from 'react'

const Genres = ({ match }) => {
    const genreId = match.params.genreId;

    return (
        <div>
            <h1>Bienvenu sur le genre {genreId}</h1>
        </div>
    )
}

export default Genres
