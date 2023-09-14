import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {MyContext} from "./Context";
import axios from "axios";
import {API_URL} from "./config";
import Notification from "./Notification";
import {MDBIcon} from "mdb-react-ui-kit";


function Navbar(){
    const ctx = useContext(MyContext);
    const logout = ()=>{
        axios.get(`${API_URL}/logout`,{withCredentials:true})
            .then(res=>{
                if(res.data==="Success"){
                    window.location.href = '/'
                }
            })
    }
    return (

        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                                               href="/logout"
                                               onClick={logout}
                                            >
                                                <MDBIcon fas icon="sign-out-alt" />
                                            </a>
                                        </li>
                                        <li className="nav-item right-notification">
                                            <a className="nav-link " href="#">
                                                <Notification />
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