import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import {API_URL} from "./config";


function Project(){
    const navigate = useNavigate();

    axios.defaults.withCredentials=true ;

    useEffect(() => {

        axios.get(`${API_URL}/`)
            .then(res=>{
                if(res.data.valid){
                    console.log("is Logged ")
                }
                else{
                    navigate('/login');
                }
            })
            .catch()



    }, []);
    return(
        <div>
            <h1>Mes Projets</h1>
        </div>
    )
}

export default Project;