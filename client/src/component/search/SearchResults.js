import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../../context/search/searchContext';
import Pagination from '../layout/Pagination';
import SearchList from './SearchList';
import { Redirect } from 'react-router-dom';

const SearchResults = ({ match, location, history }) => {
    const searchContext = useContext(SearchContext);

    const [currentPage, setCurrentPage] = useState(1);

    const text = match.params.text.replace(/-/g, ' ');

    const { searchQuery, loading, search } = searchContext;

    useEffect(() => {
        
        search(text, currentPage);

        // eslint-disable-next-line
    }, [currentPage, text]);

    return (
        <div className="container">
            <SearchList search={searchQuery} loading={loading} />
            {searchQuery.total_results > 20 ? <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total_pages={searchQuery.total_pages} /> : null}
        </div>
    )
}

export default SearchResults;
