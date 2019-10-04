import React from 'react';
import styles from '../../style/About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h1>Informations sur le développement :</h1>

            <h2>Version</h2>
            <p>La version 3 de mon application cinéma. <span className="badge badge-warning">Version 3.0.0</span></p>


            <div className={styles.aboutTechnology}>
                <h2>Technologies utiliser pour le développement de cet application :</h2>
                <ul>
                    <li>
                        <h3><span>M</span> pour <span>Mangoose</span></h3>
                        <p>Mangoose est une librairie back-end Javascript pour MongoDB Dont le but est la création de modèle et Schema permettant de mettre en relation entre les informations reçues et un Schéma créer</p>
                    </li>
                    <li>
                        <h3><span>E</span> pour <span>Express</span></h3>
                        <p>Express.js est un framework pour construire des applications web basée sur Node.js</p>
                    </li>
                    <li>
                        <h3><span>R</span> pour <span>React</span></h3>
                        <p>React est une librairie Javascript développer par Facebook qui permet de créer un site à l'apparence multi-page en une seul page
                            celà a comme avantage de diminuer le temps de chargement car il ni a qu'une page à charger.
                        </p>
                    </li>
                    <li>
                        <h3><span>N</span> pour <span>Node.js</span></h3>
                        <p>Node.js est une plateforme Back-end javascript celà permet de faire tourner du javascript sur le serveur</p>
                    </li>
                </ul>
                <p>Combiner ensemble ces technologies forme se que l'on appelle le MERN stack équivalent d'une app/site fullstack</p>    
            </div>


            <div className={styles.aboutChallenge}>
                <h2>Défis rencontrer lors du développement :</h2>
                <ul>
                    <li>Le premier défis a été de réaliser une application à l'aide de React pour lequel je n'avais aucune connaissance préliminaire</li>
                    <li>Le second défis a été d'utiliser NodeJs /  Express et Mangoose pour réaliser un Back-end dans le but de connecter mon application à ma Base de donnée sur mangoDb</li>
                    <li>Le troisième défis a été de connecter mon application à l'API TMDB qui m'a permis de charger films/séries/acteur/... de leur propres base de donnée</li>
                    <li>Le quatrième défis a été la création d'utilisateur, générer un token et permettre la connection en plus de mettre en relation ma DB avec les informations receuillis de l'API</li>
                </ul>

                <h2>Durrée de développement</h2>
                <p>Soit 70 Jours de développement</p>
            </div>

            <div className={styles.aboutThanksAndLink}>
                <h2>Remerciement</h2>
                <p>Je souhaite d'abord remercier le CEO de <a href="https://warrigal.lu/" target="_blank">Warrigal</a> qui m'a proposer challenge du développement de cet application.</p>
                <p>Je souhaite également remercier <a href="https://www.traversymedia.com/" target="_blank">TraversyMedia</a> dont le tuto sur React et Express m'ont permis de me lancer dans le développement de cet app</p>
                <p>Et enfin je remercie le site <a href="https://www.themoviedb.org/?language=fr" target="_blank">The Movie Data Base (TMDB)</a> qui m'a permis d'accéder à leur API.</p>

                <h2>A propos du développeur</h2>
                <p>Voici quelque liens si vous souhaitez me retrouver :</p>
                <p><a href="https://www.linkedin.com/in/ga%C3%A9tan-g%C3%A9rard/" target="_blank">Mon profil Linkedin</a>.</p>
                <p><a href="https://github.com/silverGraphik" target="_blank">Mon profil sur Github</a></p>

                <h2>Code Source du projet</h2>
                <p>Enfin voici le lien où vous pourrez inspecter le code <a href="https://github.com/silverGraphik/cineappV3" target="_blank">CineAppV3 Code Source</a></p>
                <p>Et en bonus un lien vers la V2 de l'application <a href="https://cineapp-v2.herokuapp.com/" target="_blank">cineapp-v2</a></p>
            </div>
        </div>
    )
}

export default About;
 