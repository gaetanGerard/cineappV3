import React, { useState, useContext, useEffect } from 'react';
import SearchContext from '../../context/search/searchContext';
import AlertContext from '../../context/alert/alertContext';
import { Redirect, withRouter } from 'react-router-dom';

import styles from '../../style/SearchForm.module.css';

const SearchForm = ({ location }) => {
    const searchContext = useContext(SearchContext);
    const alertContext = useContext(AlertContext);

    // pull function and state out of the context
    const { search, redirect, resetRedirection } = searchContext;
    const { setAlert } = alertContext;

    // creation of state component
    const [text, setText] = useState('');
    const [formatText, setFormatText] = useState('');

    // check on submit if the text is not empty if empty set alert
    // if not perform the search
    // and format the text for when it will be passed into the url
    const onSubmit = (e) => {
        e.preventDefault();
        if(text !== "") {
            search(text);
            setText('');
            setFormatText(text.replace(/ /g, '-'));    
        } else {
            setAlert('Aucun film, série ou acteur n\'a été renseigner dans la barre de recherche !', 'warning');
        }
    };

    // watch any change into the search input and setText with the value
    const onChange = (e) => {
        setText(e.target.value);
    };

    // look if loaction.search is not empty
    // if empty reset the redirection
    // watch for any change into location.search 
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
