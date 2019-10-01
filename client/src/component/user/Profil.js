import React, { useContext } from 'react';
import UserContext from '../../context/user/userContext';

const Profil = ({ user }) => {
    const userContext = useContext(UserContext);

    const { deleteUser, setCurrent } = userContext;

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
            <button onClick={() => setCurrent(user)}>Edit</button>
        </div>
    )
}

export default Profil;
