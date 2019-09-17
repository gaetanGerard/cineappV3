import React, { useContext, useEffect, useState } from 'react';
import SeriesContext from '../../context/series/seriesContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import Pagination from '../layout/Pagination';
import Loading from '../layout/Loading';
import styles from '../../style/Genres.module.css';
import { Link } from 'react-router-dom';

const GenresSeries = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const seriesContext = useContext(SeriesContext);
    const configurationContext = useContext(ConfigurationContext);

    const {
        listOfSeriesByGenre, 
        fetchSeriesListByGenre, 
        loading
    } = seriesContext;
    
    const {
        genresName,
    } = configurationContext;


    const genreSeriesId = match.params.genreSeriesId;

    useEffect(() => {
        fetchSeriesListByGenre(genreSeriesId, currentPage);

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [genreSeriesId, currentPage]);

    const {results, total_pages} = listOfSeriesByGenre;

    /* Get the offset for the chart */
    const offset = (voteAverage) => {
        let float = voteAverage / 10;

        return parseInt(339.292 * (1 - float));
    };

    // console.log(genresName);
    

    if (loading) {
        return <Loading />
    } else {
       return (
            <div className="container">
                {genresName !== null ? genresName.map(itemId => (
                    itemId.id === parseInt(genreSeriesId) ? <h1 key={itemId.id} className={styles.genreTitle}>Genre : {itemId.name}</h1> : null
                )) : null}
                <ul className={styles.genresContainer}>
                    {results !== undefined ? results.map(item => (
                        <li key={item.id}>
                            <Link to={`/series/${item.id}`}>
                                <img src={item.poster_path !== "" ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : `https://image.tmdb.org/t/p/w300${item.backdrop_path}`} alt={item.name}/>
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
                                        <h2>{item.name}</h2>
                                        <p>{item.first_air_date != null ? item.first_air_date.slice(0,4) : "date de difusion inconnue"}</p>
                                    </div>
                                    <div className={styles.overview}>
                                        {item.overview !== "" ? <p>{item.overview.length > 275 ? item.overview.slice(0,275) + "..." : item.overview}</p> : <p>Aucun synopsis</p>}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )) : null}
                </ul>
                <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total_pages={total_pages} />
            </div>
        ) 
    }  
}

export default GenresSeries
