import React from 'react';
import Loading from '../layout/Loading';
import styles from '../../style/SearchList.module.css';
import { Link } from 'react-router-dom';

const SearchList = ({ search, loading }) => {

    // pull key out of the props pass to the parent component
    const { total_results, results} = search;

    /* Get the offset for the chart */
    const offset = (item) => {
        let float = item.vote_average / 10;

        return parseInt(339.292 * (1 - float));
    };

    /* Refactoring the date element into a readable date */
    const refactDate = (date) => {
        if(date !== undefined) {
            let month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            let retrieveDay = date.substring(8, 10);
            let retrieveMonth = date.substring(5, 7);
            let retrieveYear =  date.substring(0, 4);

            let newDate = `${retrieveDay} ${month[parseInt(retrieveMonth) - 1]} ${retrieveYear}`;

            return newDate;
        }
    };

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className={styles.searchListContainer}>
                <h1>Nombre de résultats : {total_results}</h1>
                {results !== undefined ? <ul>
                    {results.map(item => {
                        if(item.media_type === "movie") {
                            return <li key={item.id} className={styles.searchItemCard}>
                                    <Link to={`/movie/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w342${item.poster_path != null ? item.poster_path : item.backdrop_path}`} alt={item.title}/>
                                        <div className={styles.searchContent}>
                                            <div className={styles.searchContentHeader}>
                                                <div className={styles.score}>
                                                    <div className={styles.scoreContnainer}>
                                                        <div className={styles.scoreOuterRing}>
                                                            <div className={styles.userScoreChart}>
                                                                <div className={styles.percent}>
                                                                    <svg width="68" height="68" viewBox="0 0 120 120">
                                                                        <circle className={styles.outerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="13" />
                                                                        <circle className={styles.innerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="8" 
                                                                        strokeDasharray="339.292" strokeDashoffset={`${offset(item)}`} />
                                                                    </svg>
                                                                </div>
                                                                <p className={styles.scoreText}>{item.vote_average * 10}<span>%</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.sCHTitle}>
                                                    <h2>{item.title}</h2>
                                                    <p>{refactDate(item.release_date)}</p>
                                                </div>
                                            </div>        
                                            <div className={styles.searchContentOverview}>
                                                <p>{item.overview}</p>
                                            </div>
                                        </div>  
                                    </Link>
                                </li>
                        } else if (item.media_type === "tv") {
                            return <li key={item.id} className={styles.searchItemCard}>
                                    <Link to={`/series/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w342${item.poster_path != null ? item.poster_path : item.backdrop_path}`} alt={item.name}/>
                                        <div className={styles.searchContent}>
                                            <div className={styles.searchContentHeader}>
                                                <div className={styles.score}>
                                                    <div className={styles.scoreContnainer}>
                                                        <div className={styles.scoreOuterRing}>
                                                            <div className={styles.userScoreChart}>
                                                                <div className={styles.percent}>
                                                                    <svg width="68" height="68" viewBox="0 0 120 120">
                                                                        <circle className={styles.outerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="13" />
                                                                        <circle className={styles.innerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="8" 
                                                                        strokeDasharray="339.292" strokeDashoffset={`${offset(item)}`} />
                                                                    </svg>
                                                                </div>
                                                                <p className={styles.scoreText}>{item.vote_average * 10}<span>%</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.sCHTitle}>
                                                    <h2>{item.name}</h2>
                                                    <p>{refactDate(item.first_air_date)}</p>
                                                </div>
                                            </div>        
                                            <div className={styles.searchContentOverview}>
                                                <p>{item.overview}</p>
                                            </div>
                                        </div>   
                                    </Link>
                                </li>
                        } else {
                            return <li key={item.id} className={styles.searchItemCard}>
                                    <Link to={`/staffAndActors/${item.id}`}>
                                        <img src={item.profile_path != null ? `https://image.tmdb.org/t/p/original${item.profile_path}` : "/img/plalceholder_img.png"} alt={item.name}/>
                                        <div className={styles.searchContent}>
                                            <div className={styles.searchContentHeaderForArtist}>
                                                <div className={styles.sCHTitle}>
                                                    <h2>{item.name}</h2>
                                                </div>
                                            </div>        
                                            <div className={styles.searchContentOverviewForArtist}>
                                                {item.known_for != null ? <ul>Interprétations : 
                                                    {item.known_for.map(knownFor => {
                                                        return <li key={knownFor.id}>{knownFor.title}</li>
                                                    })}    
                                                </ul> : null} 
                                            </div>
                                        </div>   
                                    </Link>
                                </li>
                        }
                    })}
                </ul> : null}
            </div>
        )    
    }
}

export default SearchList
