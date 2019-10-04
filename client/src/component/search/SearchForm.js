import React, { useState, useContext, useEffect } from 'react';
import SearchContext from '../../context/search/searchContext';
import AlertContext from '../../context/alert/alertContext';
import { Redirect, withRouter } from 'react-router-dom';

import styles from '../../style/SearchForm.module.css';

const SearchForm = ({ location }) => {
    const searchContext = useContext(SearchContext);
    const alertContext = useContext(AlertContext);

    const { search, redirect, resetRedirection } = searchContext;
    const { setAlert } = alertContext;

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
        } else {
            setAlert('Aucun film, série ou acteur n\'a été renseigner dans la barre de recherche !', 'warning');
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

        // eslint-disable-next-line
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
