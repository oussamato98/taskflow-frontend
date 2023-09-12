import React from 'react';
import ReactDOM from 'react-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import Context from "./Context";


ReactDOM.render(
    <Context>
    <App />
    </Context>
    , document.getElementById("root"));


