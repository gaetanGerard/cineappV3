import React from 'react';
import styles from '../../style/About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h1>A propos de cet application</h1>
            <p>La version 3 de mon application cinéma maintenant fullstack.<span className="badge badge-warning">Version 3.0.0</span></p>
        </div>
    )
}

export default About;
 