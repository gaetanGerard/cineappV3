import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);

    // pull function and state out of the context
    const { isAuthenticated } = authContext;

    // creation of a private Route component who can be access only if authenticated = true
    return (
        <Route { ...rest } render={props => isAuthenticated === false ? (
            <Redirect to='/' />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default PrivateRoute
