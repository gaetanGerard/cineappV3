import React, { useState, useContext, useEffect } from 'react';
import styles from '../../style/FavoriteItem.module.css';
import { Link } from 'react-router-dom';
import FavoriteContext from '../../context/favorite/favoriteContext';

const Recommendation = ({ recommendation }) => {
    const favoriteContext = useContext(FavoriteContext);

    const { deleteFavorite, addFavorite, favorite } = favoriteContext;

    const [recomInFavorite, setRecomInFavorite] = useState(false);

    const { id, backdrop_path, name, first_air_date, vote_average} = recommendation;

    const onDelete = e => {
        e.preventDefault();
        deleteFavorite(id);
        setRecomInFavorite(false);
    };

    const addMovieToFavorite = e => {
        e.preventDefault();
        addFavorite(recommendation);
        setRecomInFavorite(true);
    };

    useEffect(() => {
        for(let i = 0; i < favorite.length; i++) {
            if(id === favorite[i].id) {
                setRecomInFavorite(true);
                break;
            } else {
                setRecomInFavorite(false);
            }
        }
        
        // eslint-disable-next-line
    }, [id, recomInFavorite]);

    return (
        <li className={styles.recomItemContainer}>
            <Link to={`/series/${id}`}>
                <img className={styles.recomImg} src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={name} />
                <div className={styles.extraHoverInfos}>
                    {first_air_date !== undefined ? <p><i className="far fa-calendar-alt"></i>{first_air_date.slice(0,4)}</p> : null}
                    <p>{recomInFavorite === true ? <button className={styles.recommendationlikeIcon} onClick={onDelete}><i className="fas fa-heart"></i></button> : <button className={styles.recommendationlikeIcon_unliked} onClick={addMovieToFavorite}><i className="far fa-heart"></i></button>}</p>
                </div>
                <div className={styles.titleAndRate}>
                    <p>{name}</p>
                    <p>{vote_average} <i className="fas fa-star"></i></p>
                </div>
            </Link>
        </li>
    )
}

export default Recommendation
