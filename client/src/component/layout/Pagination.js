import React, { useEffect, useState } from 'react';
import styles from '../../style/Pagination.module.css';

const Pagination = ({ currentPage, setCurrentPage, total_pages}) => {
    // creation of a state component
    const [pager, setPager] = useState({});

    // useEffect for check the total of page of the list and pass into getPager function for establish what to render
    // watch for change into the currentPage number and the total of page
    useEffect(() => {
        const getPager = (currentPage, total_pages) => {
            /* Default to first page */
            currentPage = currentPage || 1;
    
            let startPage, endPage;
            if(total_pages <= 10) {
                /* Less than 10 total pages so show all */
                startPage = 1;
                endPage = total_pages;
            } else {
                /* More than 10 total pages so calculate start and end pages */
                if(currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= total_pages) {
                    startPage = total_pages - 9;
                    endPage = total_pages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }
    
            /* Create an array of pages to ng-repeat in the pager control */
            let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    
            /* return object with all the pager properties requires by the view */
            return setPager({
                    total_pages: total_pages,
                    currentPage: currentPage,
                    startPage: startPage,
                    endPage: endPage,
                    pages: pages
                });
        };
    
        getPager(currentPage, total_pages);

        // eslint-disable-next-line
    }, [currentPage, total_pages]);

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.prev}>
                <button className={styles.fastBackAndGo} onClick={() => setCurrentPage(1)} disabled={currentPage === 1 ? true : false}><i className="fas fa-angle-double-left"></i></button>
                <button className={styles.fastBackAndGo} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 ? true : false}><i className="fas fa-chevron-left"></i></button>
            </div>
            <ul className={styles.itemContainer}>
                {pager.pages !== undefined ? pager.pages.map(item => (
                    <li className={`item ${currentPage === item ? "active" : ""}`} key={item}><button onClick={() => setCurrentPage(item)}>{item}</button></li>
                )) : null}
            </ul>
            <div className={styles.next}>
                <button className={styles.fastBackAndGo} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === total_pages ? true : false}><i className="fas fa-chevron-right"></i></button>
                <button className={styles.fastBackAndGo} onClick={() => setCurrentPage(total_pages)} disabled={currentPage === total_pages ? true : false}><i className="fas fa-angle-double-right"></i></button> 
            </div>
        </div>
    )
}

export default Pagination
