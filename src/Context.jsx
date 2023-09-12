import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "./config";

export const MyContext = createContext({});

function Context({children}){

    const [user,setUser]=useState();
    useEffect(()=>{
        axios.get(`${API_URL}/user`,{withCredentials:true})
            .then(res=>{
                setUser(res.data)
            })
    },[])

    return(
        <MyContext.Provider value={user}>{children}</MyContext.Provider>
    )
}

export default Context;