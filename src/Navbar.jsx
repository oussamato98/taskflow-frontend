import React, {useContext, useState} from "react";
import {MyContext} from "./Context";
import axios from "axios";
import {API_URL} from "./config";
import {MDBBadge, MDBIcon} from "mdb-react-ui-kit";


function Navbar(){
    const ctx = useContext(MyContext);
    const [numberOfNotifiation , setnumberOfNotifiation]=useState();
    const logout = ()=>{
        axios.get(`${API_URL}/logout`,{withCredentials:true})
            .then(res=>{
                if(res.data==="Success"){
                    window.location.href = '/'
                }
            })
    }

   function numberofnotif(){
        // Récupérez les notifications depuis votre backend
        axios.get(`${API_URL}/notifications`,{ withCredentials: true }) // Mettez l'URL correcte pour récupérer les notifications
            .then((response) => {
                const notificationOfThisUser = response.data.filter((notification) => {
                    return notification.destinataire._id === ctx._id;
                });
                const numberOfNotifications = notificationOfThisUser.length;
                setnumberOfNotifiation(numberOfNotifications);
                console.log(notificationOfThisUser)
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des notifications :", error);
            });
   }
   numberofnotif();

    return (

        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            src="https://thumbs.dreamstime.com/b/workflow-icon-white-background-flat-style-gear-arrow-ic-workflow-icon-white-background-flat-style-gear-arrow-icon-130737945.jpg"
                            alt="Logo"
                            width="35" height="40"
                            className="d-inline-block align-text-top"/>
                        WorkFlow
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {ctx ? (<>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/projects">Espace de Travail</a>
                                        </li>
                                        <li className="nav-item right-logout">
                                            <a className="nav-link "
                                               href="/"
                                               onClick={logout}
                                            >
                                                <MDBIcon fas icon="sign-out-alt" />
                                            </a>
                                        </li>
                                        <li className="nav-item right-notification">
                                            <a className="nav-link " href="/notifications">
                                                <a className='mx-3' href='/notifications'>
                                                    <MDBIcon fas icon='envelope' size='lg' />
                                                    <MDBBadge color='danger' notification pill>
                                                        {numberOfNotifiation}
                                                    </MDBBadge>
                                                </a>
                                            </a>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <li className="nav-item ">

                                        <a className="nav-link " href="/login">Login</a>
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )



}
export default Navbar ;