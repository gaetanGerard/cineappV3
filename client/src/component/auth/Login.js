import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import styles from '../../style/Auth.module.css';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    
    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'Vous n\'êtes pas autoriser') {
            setAlert('Mots de passe / pseudo incorrect ou inexistant', 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        pseudo: '',
        password: '',
    });

    const { pseudo, password } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(pseudo === '' || password === '') {
            setAlert('Remplisser les champs requis', 'danger');
        } else {
            login({
                pseudo,
                password
            });
            setAlert(`Heureux de vous revoir ${pseudo}`, 'success');
        }
    };

    return (
        <div className="container">
            <div className={styles.authFormContainer}>
                <h1>Vous connecter</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="pseudo">Pseudo :</label>
                        <input type="text" name="pseudo" value={pseudo} onChange={onChange} required />    
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />    
                    </div>
                    <div className={styles.authSubmitContainer}>
                        <input type="submit" value="Connection" className={styles.authFormSubmit}/>
                    </div>
                </form>    
            </div>
        </div>
    )
}

export default Login
