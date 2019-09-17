import React, { useContext, useEffect } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import ConfigurationContext from '../../context/configuration/configurationContext';
import Loading from '../layout/Loading';
import styles from '../../style/Collection.module.css';
import { Link } from 'react-router-dom';

const Collection = ({ match }) => {

    const moviesContext = useContext(MoviesContext);
    const configurationContext = useContext(ConfigurationContext);

    const {
        collection,
        loading,
        fetchCollection,
        fetchCrew,
        fetchCast,
        castRows,
        crewRows
    } = moviesContext;

    const {
        genresName,
    } = configurationContext;

    const collectionId = match.params.collectionId;

    const {
        name,
        overview,
        poster_path,
        backdrop_path,
        parts
    } = collection;

    let movieId;

    if(parts !== undefined) {
        movieId = parts[0].id;
    }

    useEffect(() => {
        let isSubscribed = true;
        fetchCollection(collectionId);

        let fetchData = () => {
            if(isSubscribed) {
                fetchCrew(movieId);
                fetchCast(movieId); 
            }
        };

        fetchData();

        return () => isSubscribed = false;
        
        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [collectionId, movieId]);

    /* Get the 6 first crew member of a movie and save it inside an array */
    const getCreditCrew = crewRows => {
        let crew = [];
        if (crewRows.length > 0) {
            for (let i = 0; i < 6; i++) {
                crew.push(crewRows[i]);
            }
        }
        return crew;
    };

    const getCreditCast = castRows => {
        let cast = [];
        if (castRows.length > 0) {
            for (let i = 0; i < 6; i++) {
                cast.push(castRows[i]);
            }
        }
        return cast;
    };

    const movieCreditCast = getCreditCast(castRows);
    const movieCreditCrew = getCreditCrew(crewRows);

    // console.log(movieCreditCrew);



    let averageScore = () => {
        let scoreArr = []
        if(parts !== undefined) {
            for(let i = 0; i < parts.length; i++) {
                scoreArr.push(parts[i].vote_average);
            }
        }
        const score = scoreArr.reduce((a,b) => a + b, 0) / scoreArr.length;

        return score.toPrecision(2);
    };

    let genreArr = [];
    if (genresName !== null) {
        if(parts !== undefined) {
        for(let i = 0; i < parts[0].genre_ids.length; i++) {
                for(let j = 0; j < genresName.length; j++) {
                    if(parts[0].genre_ids[i] === genresName[j].id) {
                        genreArr.push(genresName[j].name);
                    }
                }
            } 
        }
        
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <div>
                <div className="container">
                    <div className={styles.mainContent}>
                        <div className={styles.mainContainer}>
                            <div className={styles.collectionTitle} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}}>
                                <img src={poster_path !== null ? `https://image.tmdb.org/t/p/original${poster_path}` : `https://image.tmdb.org/t/p/original${backdrop_path}`} alt={name} className={styles.collectionImg}/>
                                <div className={styles.title}>
                                    <h1>{name}</h1>
                                    <p><i className="fas fa-star"></i> {averageScore()}</p>
                                </div>
                            </div>
                            <div className={styles.collectionOverview}>
                                <div className={styles.overview}>
                                    <h2>Synopsis</h2>
                                    <hr/>
                                    <p>{overview}</p>
                                </div>
                                <div className={styles.information}>
                                    <h2>Informations</h2>
                                    <hr/>
                                    <p><strong>Nombre de films: </strong>{parts !== undefined ? parts.length : null}</p>
                                    <p><strong>Genres: </strong>{genreArr.map((genre, i, arr) => {
                                        if (arr.length - 1 === i) {
                                            return genre + ".";
                                        } else {
                                            return genre + ", ";
                                        }
                                        })} 
                                    </p>
                                </div>
                            </div>
                            <div className={styles.collectionCastAndCrew}>
                                <div className={styles.castContainer}>
                                    <h2>Distribution en vedette</h2>
                                    <hr/>
                                    <ul className={styles.collectionCreditContainer}>
                                        {movieCreditCast.length > 0 ? movieCreditCast.map(castMember => (
                                        <li key={castMember.cast_id} className={styles.collectionCreditItem}>
                                            <Link to={`/staffAndActors/${castMember.id}`}>
                                                <div className={styles.castCreditImg}>
                                                    <img src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`} alt={castMember.name}/>
                                                </div>
                                                <div>
                                                    <h3>{castMember.name}</h3>
                                                    <p>{castMember.character}</p>
                                                </div>
                                            </Link>
                                        </li>
                                        ))  : null}
                                    </ul>
                                </div>
                                <div className={styles.castContainer}>
                                    <h2>Equipe technique en vedette</h2>
                                    <hr/>
                                    <ul className={styles.collectionCreditContainer}>
                                        {movieCreditCrew.length > 0 ? movieCreditCrew.map(crewMember => (
                                            <li key={crewMember.credit_id} className={styles.collectionCreditItem}>
                                                <Link to={`/staffAndActors/${crewMember.id}`}>
                                                    <div className={styles.castCreditImg}>
                                                        <img src={`https://image.tmdb.org/t/p/original${crewMember.profile_path}`} alt={crewMember.name} />    
                                                    </div>
                                                    <div>
                                                        <h3>{crewMember.name}</h3>
                                                        <p>{crewMember.job}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))  : null}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.collectionOtherParts}>
                                <h2>Films</h2>
                                <hr />
                                <ul className={styles.moviePartsContainer}>
                                    {parts !== undefined ? parts.map(part => (<li key={part.id}><Link to={`/movie/${part.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/original${part.poster_path}`} alt={part.original_title} />
                                            <div className={styles.hoverInformation}>
                                                <p>{part.release_date}</p>
                                                <p><i className="fas fa-star"></i> {part.vote_average}</p>
                                            </div>
                                            <h3>{part.original_title}</h3>
                                        </Link></li>)) : null}
                                </ul>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
    
}

export default Collection
