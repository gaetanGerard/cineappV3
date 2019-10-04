import React, { Fragment } from 'react';
import loading from './loading.gif';

const Loading = () => {
    return (
        <div style={{height: '100vh', padding: '20em 0'}}>
            <img src={loading} alt="...Loading" style={{width: '200px', margin:'auto', display:'block'}} />
        </div>
    )
}

export default Loading;
