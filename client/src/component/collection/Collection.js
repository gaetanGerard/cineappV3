import React from 'react';

const Collection = ({ match }) => {

    const collectionId = match.params.collectionId;

    return (
        <div>
            <h1>Bienvenu sur la collection {collectionId}</h1>
        </div>
    )
}

export default Collection
