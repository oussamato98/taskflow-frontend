import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";


function PrivateRoute({ element, authenticated }) {
    return authenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute ;