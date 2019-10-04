import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import styles from '../../style/Auth.module.css';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;


    // local state where the value from the input field will be store
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        pseudo: '',
        password: '',
        password2: '',
        email: ''
    });

    // key from the user object pull out of the object
    const { fname, lname, pseudo, password, password2, email } = user;

    //set input value to his corresponding key in the state
    const onChange = e => setUser({...user, [e.target.name]: e.target.value });

    // Check if the requires field are filled if not setAlert if yes so send data to the context
    const onSubmit = e => {
        e.preventDefault();
        if(pseudo === "" || email === '' || password === '') {
            setAlert('Remplisser les champs requis svp', 'danger');
        } else if (password !== password2) {
            setAlert('Les mots de passe ne correspondent pas !', 'danger');
        } else {
            register({
                fname, 
                lname, 
                pseudo,
                email, 
                password
            });
        }
    };

    // check if authenticated if so redirect to home if not so setAlert
    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
            setAlert(`Bienvenu sur CineApp ${pseudo}`, 'success');
        }

        if(error === 'Ce pseudo est déjà utiliser') {
            setAlert(error, 'danger');
            clearErrors();
        } 

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    

    return (
        <div className="container">
            <div className={styles.authFormContainer}>
                <h1>Enregistrer votre compte</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="fname">Prénom :</label>
                        <input type="text" name="fname" value={fname} onChange={onChange} />    
                    </div>
                    <div>
                        <label htmlFor="lname">Nom :</label>
                        <input type="text" name="lname" value={lname} onChange={onChange} />    
                    </div>
                    <div>
                        <label htmlFor="email">Email* :</label>
                        <input type="email" name="email" value={email} onChange={onChange} />    
                    </div>
                    <div>
                        <label htmlFor="pseudo">Pseudo* :</label>
                        <input type="text" name="pseudo" value={pseudo} onChange={onChange} />    
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe* :</label>
                        <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />    
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm. mot de passe* :</label>
                        <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />    
                    </div>
                    <div className={styles.authSubmitContainer}>
                        <input type="submit" value="Soumettre" className={styles.authFormSubmit} />    
                    </div>
                </form>
                <p>* Champs requis</p>    
            </div>
        </div>
    )
}

export default Register
