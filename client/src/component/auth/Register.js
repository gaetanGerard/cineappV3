import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors } = authContext;

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        pseudo: '',
        password: '',
        password2: '',
        email: ''
    });

    const { fname, lname, pseudo, password, password2, email } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(pseudo === "" || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Password do not match', 'danger');
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

    useEffect(() => {
        if(error === 'Ce pseudo est déjà utiliser') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error]);

    

    return (
        <div>
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
                    <label htmlFor="email">Email :</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />    
                </div>
                <div>
                    <label htmlFor="pseudo">Pseudo :</label>
                    <input type="text" name="pseudo" value={pseudo} onChange={onChange} required />    
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />    
                </div>
                <div>
                    <label htmlFor="password2">Confirmation mot de passe :</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />    
                </div>
                <input type="submit" value="Soumettre"/>
            </form>
            <div>
            </div>
        </div>
    )
}

export default Register
