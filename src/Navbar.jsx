import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {MyContext} from "./Context";
import axios from "axios";
import {API_URL} from "./config";


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

            <nav className="navbar navbar-expand-sm bg-light">
            {ctx ?
                (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={logout} to={'/logout'}>Logout</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/projects'}>My Project</Link>
                    </li>
                </ul>
                )

            :
                (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={'/login'}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/register'}>Register</Link>
                    </li>
                </ul>
                )
            }

            </nav> )



}
export default Navbar ;