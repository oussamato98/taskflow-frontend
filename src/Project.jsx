import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


function Project(){
    const navigate = useNavigate();

    useEffect(() => {
        // // Vérifier la présence et la validité du cookie ici
        // const userCookie = Cookies.get('authCookie'); // Remplacez par le nom de votre cookie
        // if (!userCookie) {
        //     // Rediriger vers la page de connexion si le cookie n'est pas présent
        //     //navigate('/login');
        //     console.log("cookie non cree"+userCookie)
        // }
        const authCookieValue = Cookies.get('authCookie');
        console.log(authCookieValue);

    }, []);
    return(
        <div>
            <h1>Mes Projets</h1>
        </div>
    )
}

export default Project;