import React, { useContext, useEffect } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import SeriesContext from '../../context/series/seriesContext';

const DiscoverMoviesAndSeries = () => {
    const moviesContext = useContext(MoviesContext);
    const seriesContext = useContext(SeriesContext);

    const {
        fetchDiscoverMovies
         } = moviesContext;
    const {
    fetchDiscoverSeries
         } = seriesContext;

    useEffect(() => {
        fetchDiscoverMovies();
        fetchDiscoverSeries();

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1>test</h1>
        </div>
    )
}

export default DiscoverMoviesAndSeries;
