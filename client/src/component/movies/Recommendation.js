import React, { useState, useContext, useEffect } from 'react';
import styles from '../../style/FavoriteItem.module.css';
import { Link } from 'react-router-dom';
import FavoriteContext from '../../context/favorite/favoriteContext';
import AlertContext from '../../context/alert/alertContext';

const Recommendation = ({ recommendation }) => {
    const favoriteContext = useContext(FavoriteContext);
    const alertContext = useContext(AlertContext);

    // pull function and state out of the context
    const { deleteFavorite, addFavorite, favorite } = favoriteContext;
    const { setAlert } = alertContext;

    // creation of a component state
    const [recomInFavorite, setRecomInFavorite] = useState(false);

    // pull key out of the recommendation state object
    const { id, backdrop_path, title, release_date, vote_average} = recommendation;

    // function for delete movie from the favorite list
    const onDelete = e => {
        e.preventDefault();
        if(favorite !== null) {
            favorite.map(item => {
                if(item.id === id) {
                    setRecomInFavorite(false);
                    deleteFavorite(item._id);
                    setAlert(`Le film : ${item.title} a été enlevé de votre liste de favoris`, 'warning');
                }
            });
        }
    };

    // function for add movie to the favorite list
    const addMovieToFavorite = e => {
        e.preventDefault();
        addFavorite(recommendation);
        setRecomInFavorite(true);
        setAlert(`Le film : ${title} a été ajouté de votre liste de favoris`, 'success');
    };

    // useEffect for watch if the movie display is inside the favorite of the user
    // if inside is favorite list so setRecomInFavorite to true else set false
    // watch for any change into to movie id, recomInFavorite and the favorite list
    useEffect(() => {
        if(favorite !== null) {
            for(let i = 0; i < favorite.length; i++) {
                if(id === favorite[i].id) {
                    setRecomInFavorite(true);
                    break;
                } else {
                    setRecomInFavorite(false);
                }
            }
        }
        
        // eslint-disable-next-line
    }, [id, recomInFavorite, favorite]);

    return (
        <li className={styles.recomItemContainer}>
            <Link to={`/movie/${id}`}>
                <img className={styles.recomImg} src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={title} />
                <div className={styles.extraHoverInfos}>
                    <p><i className="far fa-calendar-alt"></i>{release_date}</p>
                    <p>{recomInFavorite === true ? <button className={styles.recommendationlikeIcon} onClick={onDelete}><i className="fas fa-heart"></i></button> : <button className={styles.recommendationlikeIcon_unliked} onClick={addMovieToFavorite}><i className="far fa-heart"></i></button>}</p>
                </div>
                <div className={styles.titleAndRate}>
                    <p>{title}</p>
                    <p>{vote_average} <i className="fas fa-star"></i></p>
                </div>
            </Link>
            
        </li>
    )
}

export default Recommendation
