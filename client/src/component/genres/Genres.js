import React, { useContext, useEffect, useState } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import Pagination from '../layout/Pagination';
import Loading from '../layout/Loading';
import styles from '../../style/Genres.module.css';
import { Link } from 'react-router-dom';

const Genres = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const moviesContext = useContext(MoviesContext);

    const {
        listOfMoviesByGenre, 
        fetchMoviesListByGenre, 
        loading, 
        genresName,
        fetchGenresName} = moviesContext;


    const genreId = match.params.genreId;

    useEffect(() => {
        fetchMoviesListByGenre(genreId, currentPage);
        fetchGenresName();

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [genreId, currentPage]);

    const {results, total_pages} = listOfMoviesByGenre;

    /* Get the offset for the chart */
    const offset = (voteAverage) => {
        let float = voteAverage / 10;

        return parseInt(339.292 * (1 - float));
    };

    console.log(genresName);
    

    if (loading) {
        return <Loading />
    } else {
       return (
            <div className="container">
                {genresName !== null ? genresName.map(itemId => (
                    itemId.id === parseInt(genreId) ? <h1 key={itemId.id} className={styles.genreTitle}>Genre : {itemId.name}</h1> : null
                )) : null}
                <ul className={styles.genresContainer}>
                    {results.map(item => (
                        <li key={item.id}>
                            <Link to={`/movie/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title}/>
                                <div className={styles.rightContent}>
                                    <div className={styles.headerContent}>
                                    <div className={styles.score}>
                                        <div className={styles.scoreContnainer}>
                                            <div className={styles.scoreOuterRing}>
                                                <div className={styles.userScoreChart}>
                                                    <div className={styles.percent}>
                                                        <svg width="68" height="68" viewBox="0 0 120 120">
                                                            <circle className={styles.outerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="13" />
                                                            <circle className={styles.innerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="8" 
                                                            strokeDasharray="339.292" strokeDashoffset={`${offset(item.vote_average)}`} />
                                                        </svg>
                                                    </div>
                                                    <p className={styles.scoreText}>{item.vote_average * 10}<span>%</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                        <h2>{item.title}</h2>
                                        <p>{item.release_date}</p>
                                    </div>
                                    <div className={styles.overview}>
                                        <p>{item.overview.length > 275 ? item.overview.slice(0,275) + "..." : item.overview}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total_pages={total_pages} />
            </div>
        ) 
    }  
}

export default Genres
