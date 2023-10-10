import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {MyContext} from "./Context";
import {API_URL} from "./config";

function Notification() {

    const user = useContext(MyContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Récupérez les notifications depuis votre backend
        axios.get(`${API_URL}/notifications`,{ withCredentials: true }) // Mettez l'URL correcte pour récupérer les notifications
            .then((response) => {
                const notificationOfThisUser = response.data.filter((notification) => {
                    return notification.destinataire._id === user._id;
                });
                console.log(notificationOfThisUser)
                setNotifications(notificationOfThisUser);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des notifications :", error);
            });
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id}>
                        <div>
                            <strong>Envoye par : </strong> {notification.emetteur.name}
                        </div>
                        <div>
                            <strong>Contenu :</strong> {notification.contenu}
                        </div>
                        <div>
                            <strong>Date :</strong> {notification.dateEcriture}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notification;
