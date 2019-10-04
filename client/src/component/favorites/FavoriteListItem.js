import React, { Fragment, useContext } from 'react';
import styles from '../../style/FavoriteList.module.css';
import { Link } from 'react-router-dom';
import FavoriteContext from '../../context/favorite/favoriteContext';
import AlertContext from '../../context/alert/alertContext';

const FavoriteListItem = ({ favorite }) => {
    const favoriteContext = useContext(FavoriteContext);
    const alertContext = useContext(AlertContext);

    const { deleteFavorite } = favoriteContext;
    const { setAlert } = alertContext;

    const { _id, id, list_favorite, poster_path, title, name } = favorite;

    // function for delete a movie from the favorite list when the user click on the like button
    const onDelete = e => {
        e.preventDefault();
        deleteFavorite(_id);
        if(title !== undefined) {
            setAlert(`Le film : ${title} a été enlevé de votre liste de faovris`, 'warning');
        } else {
            setAlert(`La série : ${name} a été enlevé de votre liste de favoris`, 'warning');
        }
    };
    
    // check if title is defined or not if undefined so the else must be call beceause the data for the title havent the same name for the series
    if(title !== undefined) {
        return (
            <Fragment>
                <Link to={`/movie/${id}`} className={styles.listItem}>
                        {list_favorite !== "" || null ? <button onClick={onDelete}><i className="fas fa-heart"></i></button> : <button><i className="far fa-heart"></i></button>}
                        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
                        <h3>{title}</h3>     
                </Link>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Link to={`/series/${id}`} className={styles.listItem}>
                        {list_favorite !== "" || null ? <button onClick={onDelete}><i className="fas fa-heart"></i></button> : <button><i className="far fa-heart"></i></button>}
                        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
                        <h3>{name}</h3>     
                </Link>
            </Fragment>
        )
    }
}

export default FavoriteListItem
