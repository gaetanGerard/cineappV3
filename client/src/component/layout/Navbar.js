import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style/Navbar.module.css';
import PropTypes from 'prop-types';
import FavoriteContext from '../../context/favorite/favoriteContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Navbar = ({ title, logo}) => {
    const favoriteContext = useContext(FavoriteContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const [dataOpen, setDataOpen] = useState(false);

    const { clearFavorite } = favoriteContext;
    const { isAuthenticated, user, logout } = authContext;
    const { setAlert } = alertContext;

    /* Set the dataOpen back to false when click on navLink */
    const closeNav = () => setDataOpen(false);


    const onLogout =  () => {
        logout();
        setAlert(`A bientôt sur CineApp`, 'infos');
        clearFavorite();
        if(dataOpen === true) {
            closeNav();
        }
    };

    const authLinks = (
        <Fragment>
            <li>
                <Link to='/profil'>{user && user.pseudo}</Link>
            </li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i><span>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guessLinks = (
        <li className={styles.guessLink}>
            <Link to='/login' className={styles.loginBtn}>Se connecter</Link>
            <Link to='/register' className={styles.RegisterLink}>S'enregistrer</Link>
        </li>
    );

    const authLinksResp = (
        <Fragment>
            <li>
                <Link to='/profil' onClick={closeNav}>{user && user.pseudo}</Link>
            </li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i><span>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guessLinksResp = (
        <Fragment>
            <li>
                <Link to='/login' onClick={closeNav} className={styles.loginBtnResp}>Se connecter</Link>
            </li>
            <li>
                <Link to='/register' onClick={closeNav} className={styles.RegisterLinkResp}>S'enregistrer</Link>
            </li>    
        </Fragment>
    );

    
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
                {isAuthenticated ?  authLinks : guessLinks}
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
                    {isAuthenticated ?  authLinksResp : guessLinksResp}
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
