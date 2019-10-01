import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';
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

    const {addUser, users, current, clearCurrent, updateUser } = userContext;

    useEffect(() => {
        if(current !== null) {
            setUser(current);
        } else {
            setUser({
                fname: '',
                lname: '',
                pseudo: '',
                email: '',
                phone: '',
                password: ''
            });
        }
    }, [userContext, current]);

    const onSubmit = e => {
        e.preventDefault();

        if(current === null) {
            addUser(user);
        } else {
            updateUser(user);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>{current ? 'Editer profil' : "S'enregistrer"}</h2>
                <input type="text" name="fname" placeholder="Prénom" value={fname} onChange={onChange} />
                <input type="text" name="lname" placeholder="Nom" value={lname} onChange={onChange} />
                <input type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={onChange} />
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                <input type="text" name="phone" placeholder="Téléphone" value={phone} onChange={onChange} />
                <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={onChange} />
                <input type="submit" value={current ? 'Editer profil' : "S'enregistrer"}/>
                {current && <div>
                    <button onClick={clearAll}>Annuler</button>
                </div>}
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
