import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    //Map threw the array of error and display it with the corresponding message

    return (
        <div className="alertContainer">
            {alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    <i className="fas fa-info-circle"></i> {alert.msg}
                </div>
            ))}
        </div>
    )
}

export default Alerts
