import React, { useContext, useEffect } from 'react';
import FavoriteContext from '../../context/favorite/favoriteContext';
import styles from '../../style/FavoriteList.module.css';
import FavoriteListItem from './FavoriteListItem';
import Loading from '../layout/Loading';

const FavoriteList = () => {
    const favoriteContext = useContext(FavoriteContext);

    const { favorite, getFavorite } = favoriteContext;

    useEffect(() => {
        getFavorite();

        // eslint-disable-next-line
    }, [favorite]);

    if(favorite !== null) {
        return (
            <div className="container">
                {favorite.length === 0 ? <h2 className={styles.noFavTitle}>Vous n'avez aucun favoris dans votre liste pour l'instant !</h2> : null}
                <div className={styles.favorite}>
                    {favorite.map(favorite =>
                        <FavoriteListItem favorite={favorite} key={favorite.id} />
                        )} 
                </div>    
            </div> 
        )
    } else {
        return <Loading />
    }
}

export default FavoriteList;
