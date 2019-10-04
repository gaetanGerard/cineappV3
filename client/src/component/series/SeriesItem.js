import React, { useState, useContext, useEffect } from 'react';
import Loading from '../layout/Loading';
import styles from '../../style/FavoriteItem.module.css';
import FavoriteContext from '../../context/favorite/favoriteContext';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';
import Recommendation from './Recommendation';

const SeriesItem = ({serie, season, loading, cast, recommendations, languagesName, countriesName}) => {
    const favoriteContext = useContext(FavoriteContext);
    const alertContext = useContext(AlertContext);

    const { deleteFavorite, addFavorite, favorite, getFavorite } = favoriteContext;
    const { setAlert } = alertContext;

    const [inFavorite, setInFavorite] = useState(false);

    const {
        backdrop_path,
        created_by,
        episode_run_time,
        first_air_date,
        genres,
        homepage,
        id,
        in_production,
        languages,
        last_episode_to_air,
        name,
        networks,
        next_episode_to_air,
        number_of_episodes,
        number_of_seasons,
        origin_country,
        original_language,
        original_name,
        overview,
        poster_path,
        status,
        type,
        vote_average,
    } = serie;

    const onDelete = e => {
        e.preventDefault();
        if(favorite !== null) {
            favorite.map(item => {
                if(item.id === id) {
                    deleteFavorite(item._id);
                    setInFavorite(false);
                    setAlert(`La série : ${item.name} a été enlevé de votre liste de favoris`, 'warning');
                }
            });
        }
    };

    const addMovieToFavorite = e => {
        e.preventDefault();
        addFavorite(serie);
        setInFavorite(true);
        setAlert(`La série : ${name} a été ajouté de votre liste de favoris`, 'success');
    };

    useEffect(() => {
        getFavorite();
        if(favorite !== null) {
            for(let i = 0; i < favorite.length; i++) {
                if(id === favorite[i].id) {
                    setInFavorite(true);
                    break;
                } else {
                    setInFavorite(false);
                }
            }    
        }
        
        // eslint-disable-next-line
    }, [id, inFavorite, favorite]);


    /* Get only the Year of the serie is or will be released */
    const year = () => {
        if(first_air_date != null) {
            return first_air_date.slice(0, 4);
        }
        return first_air_date;
    };

    /* change vote_average into % */
    let voteAverage = vote_average*10;

    /* Get the offset for the chart */
    const offset = () => {
        let float = vote_average / 10;

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

    if(loading && serie) {
        return  (
            <div>
                <Loading />    
            </div>
        )
    } else {
        return (
            <div>
                <div className="container">
                    <div className={styles.movieHeader} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}}>
                        <img className={styles.poster} src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name}/>
                        <div className={styles.movieMainInfos}>
                            <h1>{name} <span>({loading === false ? year() : null})</span></h1>
                            <div className={styles.infos}>
                                <div className={styles.score}>
                                    <div className={styles.scoreContnainer}>
                                        <div className={styles.scoreOuterRing}>
                                            <div className={styles.userScoreChart}>
                                                <div className={styles.percent}>
                                                    <svg width="68" height="68" viewBox="0 0 120 120">
                                                        <circle className={styles.outerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="13" />
                                                        <circle className={styles.innerCircle} cx="60" cy="60" r="54" fill="none" strokeWidth="8" 
                                                        strokeDasharray="339.292" strokeDashoffset={`${offset()}`} />
                                                    </svg>
                                                </div>
                                                <p className={styles.scoreText}>{voteAverage}<span>%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.sText}>Note<br/> des utilisateurs</p>
                                </div>
                                <div>
                                    {inFavorite === true ? <button className={styles.likeIcon} onClick={onDelete}><i className="fas fa-heart"></i></button> : <button className={styles.likeIcon_unliked} onClick={addMovieToFavorite}><i className="far fa-heart"></i></button>}
                                </div>
                                <p className={styles.watchTrailer}><i className="fas fa-play"></i> Regarder le trailer</p>
                            </div>
                            <div className={styles.overview}>
                                <h2>Synopsis</h2>
                                <p>{overview}</p>
                            </div>
                            <div className={styles.technique}>
                                <h2>Equipe technique en vedette</h2>
                                <ul className={styles.crewList}>
                                    {created_by !== undefined ? created_by.map(created_by => (created_by !== undefined ? <li key={created_by.credit_id}><Link to={`/staffAndActors/${created_by.id}`}><h3>{created_by.name}</h3><p>Créateur</p></Link></li> : null)) : null }
                                </ul>
                            </div>
                        </div>
                    </div>     
                    <div className={styles.mainContentAndAside}>
                        <div className={styles.mainContent}>
                            <div className={styles.Actors}>
                                <div className={styles.castListContainer}>
                                    <h2>Distribution de la série</h2>
                                    <ul className={styles.castList}>
                                        {cast !== undefined ? cast.map(castMember => 
                                            (castMember !== undefined ?<li key={castMember.id} className={styles.card}>
                                                <Link to={`/staffAndActors/${castMember.id}`}>
                                                    <img src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`} alt={castMember.name} />
                                                    <h3>{castMember.name}</h3><p>{castMember.character}</p>
                                                </Link>
                                            </li> : null)) : null }    
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.actualSeason}>
                                <h2>{in_production === true ? "Saison actuelle" : "Dernière saison"}</h2>
                                <div className={styles.seasonContainer}>
                                    <Link to={`/series/${id}/season/${season.season_number}`} className={styles.seasonCard}>
                                        <img src={`https://image.tmdb.org/t/p/original${season.poster_path}`} alt={`saison ${season.season_number} de ${name}`}/>
                                        <div className={styles.seasonContent}>
                                            <h3>{season.name}</h3>
                                            <div className={styles.dateAndEpisode}>
                                                {season.air_date !== undefined ? <p className={styles.separator}>{season.air_date.slice(0,4)}</p> : null}
                                                {season.episodes !== undefined ? <p>{season.episodes.length} épisodes</p> : null}
                                            </div>
                                            {season.air_date !== undefined ? <p className={styles.seasonOverview}>{season.overview !== "" ? season.overview.length > 275 ? season.overview.slice(0,275) + "..." : season.overview : season.name + " de " + name + " diffusée le " + refactDate(season.air_date) + "." }</p> : null}
                                        </div>
                                    </Link>
                                    <Link to={`/series/${id}/seasons`} className={styles.seasonsLink}>Voire toute les saisons</Link>
                                </div>
                            </div>
                            <div className={styles.lastNextEpisodeContainer}>
                                {last_episode_to_air !== undefined ? <div className={styles.lastNextEpisode}>
                                    <h2>Dernier épisode</h2>
                                    {last_episode_to_air != null ? <div className={styles.lastNextEpisodeItem}>
                                        <img src={`https://image.tmdb.org/t/p/original${last_episode_to_air.still_path}`} alt={`${name} ${last_episode_to_air.name} de la saison ${last_episode_to_air.season_number}`}/>
                                        <div className={styles.lastNextEpisodeContent}>
                                            <h3>Saison {last_episode_to_air.season_number}</h3>
                                            <p>{last_episode_to_air.name}</p>
                                            <p>Diffusé le <span>{refactDate(last_episode_to_air.air_date)}</span></p>  
                                        </div> 
                                    </div> : null}               
                                </div> : null}
                                {next_episode_to_air != null ? <div className={styles.lastNextEpisode}>
                                    <h2>Prochain épisode</h2>
                                    <div className={styles.lastNextEpisodeItem}>
                                        <img src={`https://image.tmdb.org/t/p/original${next_episode_to_air.still_path !== null ? next_episode_to_air.still_path : season.poster_path}`} alt={`${name} ${last_episode_to_air.name} de la saison ${last_episode_to_air.season_number}`}/>
                                        <div className={styles.lastNextEpisodeContent}>
                                            <h3>Saison {next_episode_to_air.season_number}</h3>
                                            <p>{next_episode_to_air.name}</p>
                                            <p>Diffusé le <span>{refactDate(next_episode_to_air.air_date)}</span></p> 
                                        </div>
                                    </div>               
                                </div> : null}
                            </div>
                            {recommendations.length > 0 ? <div className={styles.recommendation}>
                                <h2>Recommendation</h2>
                                <ul className={styles.recomContainer}>
                                     {recommendations.map(recommendation => (
                                         <Recommendation recommendation={recommendation} key={recommendation.id} />
                                     ))}
                                </ul>
                            </div> : null}
                        </div>
                        <aside className={styles.aside}>
                            <h2 className={styles.asideTitle}>Informations</h2>
                            <div className={styles.asideContent}>
                                <div>
                                    <h2>Nom original</h2>
                                    <p>{original_name}</p>
                                </div>
                                <div>
                                    <h2>Diffuseur</h2>
                                    <ul>
                                        {networks !== undefined ? networks.map(company => (
                                            <li key={company.id} className={styles.diffuseurSeries}><a href={homepage} target="_blank" rel="noopener noreferrer"><img src={`https://image.tmdb.org/t/p/w185${company.logo_path}`} alt={company.name} /></a></li>
                                        )) : null}
                                    </ul>
                                </div>
                                <div>
                                    <h2>Status</h2>
                                    {status === "Returning Series" ?  <p>Série renouvelée</p> : null}
                                    {status === "Canceled" ?  <p>Série annulée</p> : null}
                                    {status === "Ended" ?  <p>Série terminer</p> : null}
                                </div>
                                <div>
                                    <h2>Type</h2>
                                    {type === "Scripted" ?  <p>Scénarisé</p> : null}
                                    {type === "Miniseries" ?  <p>Mini-séries</p> : null}
                                </div>
                                <div>
                                    <h2>Nombre de {number_of_seasons > 1 ? "saisons" : "saison"}</h2>
                                    <p>{number_of_seasons} {number_of_seasons > 1 ? "saisons" : "saison"}</p>
                                </div>
                                <div>
                                    <h2>Nombre {number_of_episodes > 1 ? "d'épisodes" : "d'épisode"}</h2>
                                    <p>{number_of_episodes} {number_of_episodes > 1 ? "épisodes" : "épisode"}</p>
                                </div>
                                <div>
                                    <h2>Langue originale</h2>
                                    {languagesName != null ? languagesName.map(item => (
                                        item.iso_639_1 === original_language ? <p key={item.name}>{item.name} ({item.english_name})</p> : null
                                    )) : null}
                                </div>
                                <div>
                                    <h2>Durée</h2>
                                    <ul>
                                        {episode_run_time !== undefined ? episode_run_time.map(item => (
                                            <li key={item}>{item} min</li>
                                        )) : null}
                                    </ul>
                                </div>
                                <div>
                                    <h2>Langue parler</h2>
                                    <ul>
                                        {languages !== undefined ? languages.map(language => (
                                            languagesName != null ? languagesName.map(item => (
                                            item.iso_639_1 === language ? <li key={language}>{item.name} ({item.english_name})</li> : null
                                            )) : null
                                        )) : null}
                                    </ul>
                                </div> 
                                <div>
                                    <h2>Pays d'origine</h2>
                                    {origin_country && <ul>
                                        {countriesName != null ? countriesName.map(countryName => (
                                            origin_country.map(serieOriginCountry => {
                                                return countryName.iso_3166_1 === serieOriginCountry ? <li key={serieOriginCountry}>{countryName.english_name}</li>
                                                : null})
                                        )) : null}
                                    </ul>}
                                </div>
                                <div className={styles.genres}>
                                    <h2>Genres</h2>
                                    <ul>
                                        {genres !== undefined ? genres.map(genre => (
                                            <li key={genre.id}><Link to={`/genre/series/${genre.id}`} className="badge badge-light">{genre.name}</Link></li>
                                        )) : null}
                                    </ul>
                                </div>  
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default SeriesItem
