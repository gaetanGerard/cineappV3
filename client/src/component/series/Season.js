import React, { useContext, useEffect } from 'react';
import SeriesContext from '../../context/series/seriesContext';
import Loading from '../layout/Loading';
import styles from '../../style/Season.module.css';
import { Link } from 'react-router-dom';
import ExpandCollapse from './ExpandCollapse';

const Season = ({match}) => {

    const seriesContext = useContext(SeriesContext);

    const {
        loading,
        season,
        serie,
        fetchSeason,
        fetchSerie
    } = seriesContext;

    const seriesId = match.params.seriesId;
    const seasonNumber = match.params.seasonNumber;

    useEffect(() => {
        fetchSerie(seriesId);
        fetchSeason(seriesId, seasonNumber);

        // eslint-disable-next-line
    }, [seriesId, seasonNumber]);

    const {
        air_date,
        credits,
        episodes,
        name,
        poster_path,
        season_number
    } = season;

    const {
        seasons
    } = serie;

    const actorsArr = [];

    for(let i = 0; i < 6; i++) {
        if(credits !== undefined) {
            if(credits.cast.length > 0) {
                if(credits.cast[i] !== undefined) {
                    actorsArr.push((<li key={credits.cast[i].id} className={styles.seasonASItem}>
                        <Link to={`/staffAndActors/${credits.cast[i].id}`}>
                            <img src={`https://image.tmdb.org/t/p/w185${credits.cast[i].profile_path}`} alt={credits.cast[i].name}/>
                            <div className={styles.actorDetails}>
                                <p className={styles.actorsName}>{credits.cast[i].name}</p>
                                <p>{credits.cast[i].character}</p>
                            </div>
                        </Link>
                    </li>));      
                }  
            }
        }
    }

    const creditsCrew = [];

    for(let i = 0; i < 6; i++) {
        if(credits !== undefined) {
            if(credits.crew.length > 0) {
                if(credits.crew[i] !== undefined) {
                    creditsCrew.push((<li key={credits.crew[i].credit_id} className={styles.seasonASItem}>
                        <Link to={`/staffAndActors/${credits.crew[i].id}`}>
                            <img src={`https://image.tmdb.org/t/p/w185${credits.crew[i].profile_path}`} alt={credits.crew[i].name}/>
                            <div className={styles.actorDetails}>
                                <p className={styles.actorsName}>{credits.crew[i].name}</p>
                                <p>{credits.crew[i].job}</p>
                            </div>
                        </Link>
                    </li>));     
                }
            }
        }
    }

    
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if(loading) {
        return <Loading />
    } else {
        return (
            <div className="container">
                <div className={styles.contentHeader}>
                    <div className={styles.seasonHeaderContainer}>
                        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`poster de  la ${name}`}/>
                        <div className={styles.title}>
                            <h1>{name} {air_date && <span>({air_date.slice(0,4)})</span>}</h1>
                            <Link to={`/series/${seriesId}/seasons`}><i className="fas fa-long-arrow-alt-left"></i> Retour à la liste des saisons</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.seasonStaffAndActors}>
                        <h2>Distribution de la saison <span>({credits && credits.cast.length})</span></h2>
                        <ul>
                            {actorsArr.length > 0 ? actorsArr.map(item => item) : <li>Aucun acteur n'a été renseigné pour cet saison.</li>}
                        </ul>
                    </div>
                    <div className={styles.seasonStaffAndActors}>
                        <h2>{capitalize("équipe")}  de la saison <span>({credits && credits.crew.length})</span></h2>
                        <ul>
                            {creditsCrew.length > 0 ? creditsCrew.map(item => item) : <li>Aucun membre d'équipe n'a été renseigné pour cet saison.</li>}
                        </ul>
                    </div>
                    <div className={styles.seasonEpisodes}>
                        <h2>{capitalize("épisodes")} <span>({episodes && episodes.length})</span></h2>
                        {episodes && episodes.map(item => (
                            <ExpandCollapse episode={item} key={item.id} />    
                        ))}
                    </div>
                    <div className={styles.seasonNav}>
                        {seasons !== undefined ? seasons.map((item) => (
                            item.season_number === (season_number - 1) ? <Link className={styles.seasonNavDown} to={`/series/${seriesId}/season/${season_number - 1}`} key={season_number - 1}><i className="fas fa-arrow-left"></i> {item.name}</Link> : null
                        )) : null }
                        {seasons !== undefined ? seasons.map((item) => (
                            item.season_number === (season_number + 1) ? <Link className={styles.seasonNavUp} to={`/series/${seriesId}/season/${season_number + 1}`} key={season_number + 1}>{item.name} <i className="fas fa-arrow-right"></i></Link> : null
                        )) : null }
                    </div>
                </div>
            </div>
        )    
    }
}

export default Season
