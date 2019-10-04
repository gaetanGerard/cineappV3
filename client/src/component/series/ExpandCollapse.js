import React, { useState } from 'react';
import styles from '../../style/ExpandCollapse.module.css';
import { Link } from 'react-router-dom';

const ExpandCollapse = ({ episode }) => {
    //creation of state component
    const [expanded, setExpanded] = useState(false);
    const [expandText] = useState("Voire plus");
    const [collapseText] = useState("Réduire");

    // pull key out of the episode props object
    const {
        air_date,
        crew,
        episode_number,
        guest_stars,
        name,
        overview,
        still_path,
    } = episode;

    /* Refactoring the date element into a readable date */
    const refactDate = () => {
        if(air_date !== undefined) {
            let month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            let retrieveDay = air_date.substring(8, 10);
            let retrieveMonth = air_date.substring(5, 7);
            let retrieveYear =  air_date.substring(0, 4);

            let newDate = `${retrieveDay} ${month[parseInt(retrieveMonth) - 1]} ${retrieveYear}`;

            return newDate;
        }
    };

    /* Function for uppercase the first letter with an accent */
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    // onclick setExpendend !== of what it was
    const expand = (e) => {
        setExpanded(!expanded);
    };

    // store in array directing if department match or inside writing
    const directingArr = [];
    const writingArr = [];

    crew.map(item => {
        if(item.department === "Directing") {
            return directingArr.push(item.name);
        } else if(item.department === "Writing") {
            return writingArr.push(item.name);
        }  else {
            return null;
        }   
    });

    return (
        <div className={expanded !== true ? `${styles.expandCollapseContainer}` : `${styles.expandCollapseContainer} ${styles.expandedOpen}`}>
            <div className={styles.collapedContentContainer}>
                <img src={still_path !== null ? `https://image.tmdb.org/t/p/w300${still_path}` : "/img/plalceholder_img.png"} alt={name}/>
                <div className={styles.collapsedContent}>
                    <div className={styles.collTitleContent}>
                        <h2>{episode_number}. {name}</h2>
                        <p>{air_date != null ? refactDate() : null}</p>
                    </div>
                    <p>{overview !== "" ? overview : "Aucun synopsis"}</p>
                </div>
            </div>
            <div className={expanded !== true ?  `${styles.expandedContentContainer}` : `${styles.expandedContentContainer} ${styles.contentDisplay}`}>
                <div className={styles.crewContainer}>
                    <h2>{capitalize("équipe")} technique ({crew.length})</h2>
                    <p>Réalisé par :
                        <span>
                            {directingArr.length > 0 ? directingArr.map((item, i, arr) => {
                                if (arr.length - 1 === i) {
                                    return " " + item + " ";
                                } else {
                                    return " " + item + ", ";
                                }
                            }) : " Aucun directeur n'a été ajouté."} 
                        </span> 
                    </p>
                    <p>{capitalize("écrit")} par :
                        <span>
                            {writingArr.length > 0 ? writingArr.map((item, i, arr) => {
                                if (arr.length - 1 === i) {
                                    return " " + item + " ";
                                } else {
                                    return " " + item + ", ";
                                }
                            }) : " Aucun scénariste n'a été ajouté."}     
                        </span>
                    </p>
                </div>
                <div className={styles.guestStarContainer}>
                    <h2>Guest stars <span>({guest_stars.length})</span></h2>
                    {guest_stars.length > 0 ?<ul>
                        {guest_stars.map(item => (
                            <li key={item.id}>
                                <Link to={`/staffAndActors/${item.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} alt={item.name}/>
                                    <div className={styles.actorsDetail}>
                                        <p className={styles.actorsName}>{item.name}</p>
                                        <p>{item.character}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul> : <p className={styles.noGuestStar}>Aucune guest-star n'a été ajoutée.</p>}
                </div>
            </div>
            <div className={styles.expandedButton}>
                {expanded !== true ? <button onClick={expand}><i className="fas fa-chevron-down"></i> {expandText}</button> : <button onClick={expand}><i className="fas fa-chevron-up"></i> {collapseText}</button>}
            </div>
        </div>
    )
}

export default ExpandCollapse
