import React, { useContext } from 'react';
import FavoriteContext from '../../context/favorite/favoriteContext';
import styles from '../../style/FavoriteList.module.css';
import FavoriteListItem from './FavoriteListItem';

const FavoriteList = () => {
    const favoriteContext = useContext(FavoriteContext);

    const { favorite } = favoriteContext;

    return (
        <div className="container">
            <div className={styles.favorite}>
                {favorite.map(favorite =>
                    <FavoriteListItem favorite={favorite} key={favorite.id} />
                    )} 
            </div>    
        </div> 
    )
}

export default FavoriteList;
