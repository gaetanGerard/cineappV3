import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Profil = ({ user }) => {
    const authContext = useContext(AuthContext);

    const { deleteUser } = authContext;

    const onDelete = () => {
        deleteUser(id);
    };

    const { email, fname, id, lname, phone, pseudo } = user;


    return (
        <div>
            <hr />
            <p><strong>Prénom : </strong>{fname}</p>
            <p><strong>Nom : </strong>{lname}</p>
            <p><strong>Pseudo : </strong>{pseudo}</p>
            <p><strong>Phone : </strong>{phone}</p>
            <p><strong>Email : </strong>{email}</p>
            <button onClick={onDelete}>Supprimer</button>
        </div>
    )
}

export default Profil;
