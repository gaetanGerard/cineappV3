import React, { useContext } from 'react';
import FavoriteContext from '../../context/favorite/favoriteContext';
import { Link } from 'react-router-dom';
import styles from '../../style/FavoriteList.module.css';

const FavoriteList = () => {
    const favoriteContext = useContext(FavoriteContext);

    const { favorite } = favoriteContext;

    return (
        <div className="container">
            <div className={styles.favorite}>
                {favorite.map(favorite =>
                <Link to={`/favorite/${favorite.id}`} key={favorite.id} className={styles.listItem}>
                        {favorite.list_favorite !== "" || null ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                        <img src={`https://image.tmdb.org/t/p/original${favorite.poster_path}`} alt={favorite.title} />
                        <h3>{favorite.title}</h3>     
                </Link>
                    )} 
            </div>    
        </div> 
    )
}

export default FavoriteList;
