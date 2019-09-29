import React, { useContext, useEffect } from 'react';
import SeriesContext from '../../context/series/seriesContext';
import styles from '../../style/Seasons.module.css';
import { Link } from 'react-router-dom';

const Seasons = ({ match }) => {
    const seriesContext = useContext(SeriesContext);

    const {
        fetchSerie,
        serie,
    } = seriesContext;

    const seriesId = match.params.seriesId;

    useEffect(() => {
        fetchSerie(seriesId);

        // eslint-disable-next-line
    }, [seriesId]);

    const {
        air_date,
        poster_path,
        name,
        seasons
    } = serie;

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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

    return (
        <div className="container">
            <div className={styles.contentHeader}>
                    <div className={styles.seasonHeaderContainer}>
                        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`poster de  la ${name}`}/>
                        <div className={styles.title}>
                            <h1>{name} {air_date && <span>({air_date.slice(0,4)})</span>}</h1>
                            <Link to={`/series/${seriesId}`}><i className="fas fa-long-arrow-alt-left"></i> Retour à l'écran principal</Link>
                        </div>
                    </div>
                </div>
            <div className={styles.contentBody}>
                <ul>
                    {seasons != null ?  seasons.map(item => (
                        <li key={item.id} className={styles.seasonContainer}>
                            <Link to={`/series/${seriesId}/season/${item.season_number}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={`${item.name}`}/>
                                <div className={styles.seasonsContent}>
                                    <div className={styles.seasonsHeader}>
                                        <h1>{item.name}</h1>
                                        {item.air_date != null ? <p className={styles.rightBorder}>{item.air_date.slice(0,4)}</p> : null}
                                        <p>{item.episode_count} {capitalize("épisodes")}</p>
                                    </div>
                                    {item.air_date != null ? <div className={styles.seasonsDetail}>
                                        <p>Saison {item.season_number} de {serie.name} diffusé le {refactDate(item.air_date)}.</p>
                                    </div> : null}
                                    {item.overview != null ? <div className={styles.seasonsOverview}>
                                        <p>{item.overview.length > 275 ? item.overview.slice(0,275) + "..." : item.overview}</p>
                                    </div> : null}   
                                </div>
                            </Link>
                        </li>
                    )) : null}
                </ul>
            </div>
        </div>
    )
}

export default Seasons
