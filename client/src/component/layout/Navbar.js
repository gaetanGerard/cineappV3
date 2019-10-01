import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style/Navbar.module.css';
import PropTypes from 'prop-types';


const Navbar = ({ title, logo}) => {
    const [dataOpen, setDataOpen] = useState(false);

    
    /* toggle the dataOpen to true or false when click on the navigation menu */
    const toggle = () => {
        // console.log(test);
        if(dataOpen === false) {
            setDataOpen(true);
        } else {
            setDataOpen(false);
        }
    };

    /* Set back the dataOpen to false when click outside the div */
    const handleClickOutside = () => {
        if(dataOpen === true && window.event.clientX > 181) {
            setDataOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });

    /* Set the dataOpen back to false when click on navLink */
    const closeNav = () => setDataOpen(false);


    return (
        <nav>
            <div className={styles.navbrand}>
                <Link to="/" ><img src={logo} alt="logo de l'app" /><span>{title}</span></Link>
            </div>
            <ul className={styles.xlScreenNav}>
                <li>
                    <Link to='/'>Accueil</Link>
                </li>
                <li>
                    <Link to='/about'>A propos</Link>
                </li>
                <li>
                    <Link to='/profil'>SilverGraphik</Link>
                </li>
                <li>
                    <Link to='/register'>S'enregistrer</Link>
                </li>
                <li>
                    <Link to='/login'>Connection</Link>
                </li>
            </ul>
            <div className={styles.responsiveNav}>
                <button className={styles.toggleMenu} onClick={toggle}>{dataOpen === false ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}</button>
            </div>
            <div id="respNav" className={dataOpen === false ? `${styles.respContainer}` : `${styles.respContainer} ${styles.respContainerOpen}`}>
                <ul>
                    <li>
                        <Link to='/' onClick={closeNav}>Accueil</Link>
                    </li>
                    <li>
                        <Link to='/about' onClick={closeNav}>A propos</Link>
                    </li>
                    <li>
                        <Link to='/profil' onClick={closeNav}>SilverGraphik</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    logo: PropTypes.string
}

Navbar.defaultProps = {
    title: 'CineApp',
    logo: "https://www.themoviedb.org/assets/2/v4/logos/powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg"
}

export default Navbar
