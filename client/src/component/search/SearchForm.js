import React, { useState, useContext, useEffect } from 'react';
import SearchContext from '../../context/search/searchContext';
import { Redirect, withRouter } from 'react-router-dom';

import styles from '../../style/SearchForm.module.css';

const SearchForm = ({ location, history }) => {
    const searchContext = useContext(SearchContext);

    const { search, redirect, resetRedirection } = searchContext;

    const [text, setText] = useState('');
    const [formatText, setFormatText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        // if(text === "") {
        //     alertContext.setAlert('Aucun terme n\' a été fournit à votre recherche', 'light');
        // } else {
        //     moviesContext.searchMovies(text);
        //     setText('');  
        // }
        if(text !== "") {
            search(text);
            setText('');
            setFormatText(text.replace(/ /g, '-'));    
        }
    };

    const onChange = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        if(location.search === "") {
            resetRedirection();
            setText('');
            setFormatText('');
        }
    }, [location.search]);

    return (
        <div>
            <form className={styles.searchForm} onSubmit={onSubmit} >
                <input 
                    type="text" 
                    name="text"
                    className={styles.searchInput}
                    placeholder="Chercher votre film, série, acteur..." 
                    value={text} 
                    onChange={onChange} />
                    <input type="submit" value="Rechercher" className={styles.searchSubmit} />
                    <button type="submit" className={styles.responsiveBtn}><i className="fas fa-search"></i></button>
                    {redirect && <Redirect to={{pathname: `/search/query=${formatText}`, search: formatText}} />}
            </form>
        </div>
    )
}

export default withRouter(SearchForm)
