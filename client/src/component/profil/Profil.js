import React from 'react';
import FavoriteList from '../favorites/FavoriteList';

const Profil = () => {
    // Profil can only be access if the authenticated === true else its cannot be reach by a guess user
    return (
        <div>
            <FavoriteList />
        </div>
    )
}

export default Profil
