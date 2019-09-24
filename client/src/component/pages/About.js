import React from 'react';
import styles from '../../style/About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h1>A propos de cet application</h1>
            <p>La version 3 de mon application cinéma maintenant fullstack.<span className="badge badge-warning">Version 3.0.0</span></p>
            <h1>Se qui reste à rendre responsive</h1>
            <ul>
                <li>La page des collections</li>
                <li>la page des acteurs</li>
                <li>la page des genres</li>
                <li>Season page complete in desktop</li>
                <li>Genre series page complete in desktop</li>
            </ul>
            <h2 style={{color: "var(--dark-color)"}}>Modification</h2>
            <ul>
                <li>Modifier l'appel api pour les genres pour obtenir des résultats plus cohérents !</li>
            </ul>
        </div>
    )
}

export default About;
 