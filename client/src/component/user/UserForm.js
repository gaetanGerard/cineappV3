import React, { useState, useContext } from 'react';
import UserContext from '../../context/auth/authContext';
import Profil from './Profil';

const UserForm = () => {
    const userContext = useContext(UserContext);

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        pseudo: '',
        email: '',
        phone: '',
        password: ''
    });

    const { fname, lname, pseudo, email, phone, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const {addUser, users} = userContext;

    const onSubmit = e => {
        e.preventDefault();

        addUser(user);

        setUser({
            fname: '',
            lname: '',
            pseudo: '',
            email: '',
            phone: '',
            password: ''
        });
    };

    console.log(users);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <input type="text" name="fname" placeholder="Prénom" value={fname} onChange={onChange} />
                <input type="text" name="lname" placeholder="Nom" value={lname} onChange={onChange} />
                <input type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={onChange} />
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                <input type="text" name="phone" placeholder="Téléphone" value={phone} onChange={onChange} />
                <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={onChange} />
                <input type="submit" value="Envoyer"/>
                </form>

                <div>
                    {users.map(item => (
                        <Profil user={item} key={item.id} />
                    ))}
                </div>

        </div>
    )
}

export default UserForm
