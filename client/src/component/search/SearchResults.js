import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../../context/search/searchContext';
import Pagination from '../layout/Pagination';
import SearchList from './SearchList';

const SearchResults = ({ match }) => {
    const searchContext = useContext(SearchContext);

    // pull function and state out of the context
    const { searchQuery, loading, search } = searchContext;

    // creation of a state component
    const [currentPage, setCurrentPage] = useState(1);

    // set the text back to is original look
    const text = match.params.text.replace(/-/g, ' ');

    // useEffect for set the text and currentPage into the search function
    // watch for any change into the currentPage and text
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
