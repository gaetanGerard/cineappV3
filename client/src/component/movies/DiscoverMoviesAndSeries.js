import React, { useContext, useEffect, useState } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import SeriesContext from '../../context/series/seriesContext';
import styles from '../../style/DiscoverMoviesAndSeries.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DiscoverMoviesAndSeries = () => {
    const [firstAirdate, setFirstAirdate] = useState(null);
    const [secondAirdate, setSecondAirdate] = useState(null);
    const [thirdAirdate, setThirdAirdate] = useState(null);
    const moviesContext = useContext(MoviesContext);
    const seriesContext = useContext(SeriesContext);

    const {
        fetchDiscoverMovies,
        discoverMovie
         } = moviesContext;
    const {
        discoverSerie,
        fetchDiscoverSeries,
         } = seriesContext;

    useEffect(() => {
        fetchDiscoverMovies();
        fetchDiscoverSeries(); 

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, []);

    /* Get only the id from the discover state and push them into an array */
    let seriesId = [];
    for(let i = 0; i< 3; i++) {
        if(discoverSerie[i] !== undefined) {
            seriesId.push(discoverSerie[i].id);
        }
    }

    /* This use effect is here for make a call for the 3 first series i get from the discover series call */ 
    useEffect(() => {
        const fetchAirDate = async () => {
            const firstCall = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId[0]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
            const secondCall = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId[1]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
            const thirdCall = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId[2]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
    
            setFirstAirdate(firstCall.data);
            setSecondAirdate(secondCall.data);
            setThirdAirdate(thirdCall.data);
        };

        fetchAirDate();

        // eslint-disable-next-line
    }, [seriesId[0]]);


    /* Get the actual date and the air date for check and transform the message i will display */
    const readableDate = airdate => {
        const date = Date.now();

        if (airdate !== null) {
            const airdateParse = Date.parse(airdate.next_episode_to_air.air_date);
            const sum = airdateParse - date;

            let message;
            
            if(sum <= 86400000) {
                message =  "aujourd'hui";
            } else if (Math.abs(sum) <= (86400000 * 2)) {
                message =  "demain";
            } else if (Math.abs(sum) <= (86400000 * 3)) {
                message =  "dans 3 jours";
            } else if (Math.abs(sum) <= (86400000 * 4)) {
                message =  "dans 4 jours";
            } else if (Math.abs(sum) <= (86400000 * 5)) {
                message =  "dans 5 jours";
            } else if (Math.abs(sum) <= (86400000 * 6)) {
                message =  "dans 6 jours";
            } else if (Math.abs(sum) <= (86400000 * 7)) {
                message =  "dans 7 jours";
            }
            return message;
        }
    };

    return (
        <div>
            <div>
                <div className={styles.latestSeriesMovies}>
                    <div className={styles.movieSeries}>
                        {firstAirdate !== null ? <Link to={`/series/${firstAirdate.id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${firstAirdate.backdrop_path})`}}>
                            <img src={`https://image.tmdb.org/t/p/original${firstAirdate.poster_path}`} alt={firstAirdate.original_name}/>
                            <div>
                                <h1>{firstAirdate.original_name}</h1>
                                <p>Prochain épisode {readableDate(firstAirdate)}</p>
                            </div>
                        </Link> : null}
                        <div className={styles.miniatureContainer}>
                            {secondAirdate !== null ? <Link to={`/series/${secondAirdate.id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${secondAirdate.backdrop_path})`}}>
                                <img src={`https://image.tmdb.org/t/p/original${secondAirdate.poster_path}`} alt={secondAirdate.original_name}/>
                                <div>
                                    <h1>{secondAirdate.original_name}</h1>
                                    <p>Prochain épisode {readableDate(secondAirdate)}</p>
                                </div>
                            </Link> : null}
                            {thirdAirdate !== null ? <Link to={`/series/${thirdAirdate.id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${thirdAirdate.backdrop_path})`}}>
                                <img src={`https://image.tmdb.org/t/p/original${thirdAirdate.poster_path}`} alt={thirdAirdate.original_name}/>
                                <div>
                                    <h1>{thirdAirdate.original_name}</h1>
                                    <p>Prochain épisode {readableDate(thirdAirdate)}</p>
                                </div>
                            </Link> : null}
                        </div>
                    </div>
                   {discoverMovie !== undefined ? <div className={styles.movieSeriesBottom}>
                        <div className={styles.miniatureContainer}>
                            {discoverMovie[1] !== undefined ? <Link to={`/movie/${discoverMovie[1].id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${discoverMovie[1].backdrop_path})`}}>
                                <img src={`https://image.tmdb.org/t/p/original${discoverMovie[1].poster_path}`} alt={discoverMovie[1].title}/>
                                <div>
                                    <h1>{discoverMovie[1].title}</h1>
                                </div>
                            </Link> : null}
                                {discoverMovie[2] !== undefined ? <Link to={`/movie/${discoverMovie[2].id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${discoverMovie[2].backdrop_path})`}}>
                                <img src={`https://image.tmdb.org/t/p/original${discoverMovie[2].poster_path}`} alt={discoverMovie[2].title}/>
                                <div>
                                    <h1>{discoverMovie[2].title}</h1>
                                </div>
                            </Link> : null}
                        </div>
                        {discoverMovie[0] !== undefined ? <Link to={`/movie/${discoverMovie[0].id}`} className={styles.discoverLink} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${discoverMovie[0].backdrop_path})`}}>
                            <img src={`https://image.tmdb.org/t/p/original${discoverMovie[0].poster_path}`} alt={discoverMovie[0].title}/>
                            <div>
                                <h1>{discoverMovie[0].title}</h1>
                            </div>
                        </Link> : null}
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default DiscoverMoviesAndSeries;
