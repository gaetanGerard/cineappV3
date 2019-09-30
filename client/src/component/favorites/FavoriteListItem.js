import React, { Fragment, useContext } from 'react';
import styles from '../../style/FavoriteList.module.css';
import { Link } from 'react-router-dom';
import FavoriteContext from '../../context/favorite/favoriteContext';

const FavoriteListItem = ({ favorite }) => {
    const favoriteContext = useContext(FavoriteContext);

    const { deleteFavorite } = favoriteContext;

    const {id, list_favorite, poster_path, title, name} = favorite;

    const onDelete = e => {
        e.preventDefault();
        deleteFavorite(id);
    };
    
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
