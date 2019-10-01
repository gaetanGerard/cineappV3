import React, { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState({
        pseudo: '',
        password: '',
    });

    const { pseudo, password } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log('Login submit');
    };

    return (
        <div>
            <h1>Vous connecter</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="pseudo">Pseudo :</label>
                    <input type="text" name="pseudo" value={pseudo} onChange={onChange} />    
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" value={password} onChange={onChange} />    
                </div>
                <input type="submit" value="Connection"/>
            </form>
        </div>
    )
}

export default Login
