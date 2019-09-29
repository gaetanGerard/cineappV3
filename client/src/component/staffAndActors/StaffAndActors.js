import React, { useContext, useEffect } from 'react';
import PeopleContext from '../../context/people/peopleContext';
import Loading from '../layout/Loading';
import styles from '../../style/StaffAndActors.module.css';
import { Link } from 'react-router-dom';

const StaffAndActors = ({ match }) => {
    const peopleContext = useContext(PeopleContext);

    const {
        peopleDetail,
        peopleCombinedCredit,
        loading,
        fetchPeopleDetail,
        fetchPeopleCombinedCredits
         } = peopleContext;

    const actorsId = match.params.actorsId;

    useEffect(() => {

        fetchPeopleDetail(actorsId);
        fetchPeopleCombinedCredits(actorsId);

        // console.log(favoriteId);
        // eslint-disable-next-line
    }, [actorsId]); // permet de rester à l'écoute de changement du favoriteId

    // console.log(peopleDetail);
    // console.log(peopleCombinedCredit);

    /* Set the people top credit inside an array */
    const newTop = [];
    if(peopleCombinedCredit.cast !== undefined) {
        peopleCombinedCredit.cast.map(mediaType => {
             if(mediaType.media_type === "movie") {
                 if(mediaType.popularity > 35) {
                    return newTop.push(mediaType);
                 } else {
                     return null;
                 }
             } else {
                 return null;
             }
         }); 
     }

     /* Sort the people credit cast by recent to older */
     if(peopleCombinedCredit.cast !== undefined) {
         peopleCombinedCredit.cast.sort((a,b) => {return Date.parse(b.release_date) - Date.parse(a.release_date);});
     }

    /* Sort the people credit crew by recent to older */
    if(peopleCombinedCredit.crew !== undefined) {
        peopleCombinedCredit.crew.sort((a,b) => {return Date.parse(b.release_date) - Date.parse(a.release_date);});
    }

    if(loading) {
        return <Loading />
    } else {
        return (
            <div className="container">
                <div className={styles.mainContent}>
                    <aside className={styles.staffAndAcotrsAside}>
                        <img src={`https://image.tmdb.org/t/p/w500${peopleDetail.profile_path}`} alt={peopleDetail.name}/>
                        <div className={styles.asideContainer}>
                            <h1 className={styles.lowResTitle}>{peopleDetail.name}</h1>
                            <h2>Informations personnelles</h2>
                            <ul>
                                <li>
                                    <h2>Connu(e) pour</h2>
                                    <p>{peopleDetail.known_for_department === "Acting" ? "Interprétation" : "Production"}</p>
                                </li>
                                <li>
                                    <h2>Genre</h2>
                                    <p>{peopleDetail.gender === 2 ? "Homme" : "Femme"}</p>
                                </li>
                                <li>
                                    <h2>Apparitions connues</h2>
                                    <p>{peopleCombinedCredit.cast !== undefined ? peopleCombinedCredit.cast.length + 1 : null}</p>
                                </li>
                                <li>
                                    <h2>Né(e) le </h2>
                                    <p>{peopleDetail.birthday}</p>
                                </li>
                                <li>
                                    <h2>Lieu de naissance</h2>
                                    <p>{peopleDetail.place_of_birth}</p>
                                </li>
                                <li>
                                    <h2>Site officiel</h2>
                                    <p>{peopleDetail.homepage === null ? "-" : null}</p>
                                </li>
                                {peopleDetail.also_known_as !== undefined ? <li>
                                    <h2>Aussi connu(e) sous le nom</h2>
                                    <ul>
                                        {peopleDetail.also_known_as.map(name => (
                                            <li key={name}>{name}</li>
                                        ))}
                                    </ul>
                                </li> : null}
                                {peopleDetail.deathday !== null ? <li>
                                    <h2>Décès</h2>
                                    <p>{peopleDetail.deathday}</p>
                                </li> : null}
                                <li>
                                    <br/>
                                    <br/>
                                    <p><strong>D'autre feature à acheter</strong></p>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h1>{peopleDetail.name}</h1>
                            {peopleDetail.biography !== "" ? <div className={styles.bio}>
                                <h2>Biographie</h2>
                                <p>{peopleDetail.biography}</p>
                            </div> : null}
                        </div>
                        <div className={styles.contentBody}>
                            {newTop.length > 0 ? <div className={styles.topMovie}>
                                <h2>Connu(e) pour</h2>
                                <ul>
                                    {newTop.length > 0 ? newTop.map(top => (
                                        <li key={top.id}>
                                            <Link to={`/movie/${top.id}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500${top.poster_path}`} alt={top.title}/>
                                                <h3>{top.title}</h3>
                                            </Link>
                                        </li>
                                    )) : null}
                                </ul>
                            </div> : null}
                            <div className={styles.interProd}>
                                <h2>Interprétation</h2>
                                <ul>
                                    {peopleCombinedCredit.cast !== undefined ? peopleCombinedCredit.cast.map(credit => (
                                        <li key={credit.credit_id}>
                                            {credit.release_date !== undefined ? <p>{credit.release_date !== undefined ? credit.release_date.slice(0,4) : null}</p> :
                                            <p>{credit.first_air_date !== undefined ? credit.first_air_date.slice(0,4) : null}</p>}
                                            {credit.title !== undefined ? <Link to={`/movie/${credit.id}`}>{credit.title}</Link> : <Link to={`/series/${credit.id}`}>{credit.name}</Link>}
                                            <p className={styles.disappearInLow}>en tant que {credit.character !== "" ? credit.character : peopleDetail.name}</p>
                                        </li>
                                    )) : null}
                                </ul>
                            </div>
                            <div className={styles.interProd}>
                                <h2>Production</h2>
                                <ul>
                                    {peopleCombinedCredit.crew !== undefined ? peopleCombinedCredit.crew.map(production => (
                                        production.department === "Production" ? <li key={production.credit_id}>
                                            {production.release_date !== undefined ? <p>{production.release_date.slice(0,4)}</p> :
                                            <p>{production.first_air_date !== undefined ? production.first_air_date : null}</p>}
                                            {production.title !== undefined ? <Link to={`/movie/${production.id}`}>{production.title}</Link> : <Link to={`/series/${production.id}`}>{production.name}</Link>}
                                            <p className={styles.disappearInLow}>en tant que {production.job !== "" ? production.job : "..."}</p>
                                        </li> : null
                                    )) : null}
                                </ul>
                            </div>
                            <div className={styles.interProd}>
                                <h2>Réalisation</h2>
                                <ul>
                                    {peopleCombinedCredit.crew !== undefined ? peopleCombinedCredit.crew.map(production => (
                                        production.department !== "Production" ? <li key={production.credit_id}>
                                            {production.release_date !== undefined ? <p>{production.release_date.slice(0,4)}</p> :
                                            <p>{production.first_air_date !== undefined ? production.first_air_date.slice(0,4) : null}</p>}
                                            {production.title !== undefined ? <Link to={`/movie/${production.id}`}>{production.title}</Link> : <Link to={`/series/${production.id}`}>{production.name}</Link>}
                                            <p className={styles.disappearInLow}>en tant que {production.job !== "" ? production.job : "..."}</p>
                                        </li> : null
                                    )) : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
    
}

export default StaffAndActors
