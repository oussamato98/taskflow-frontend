import React, {createContext, useState} from "react";
import Login  from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Project from "./Project";
import PrivateRoute from "./PrivateRoute";


export const Context = createContext();

function App() {

     const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/projects/*" element={<PrivateRoute element={<Project />} authenticated={isAuthenticated} />} />

                </Routes>
            </BrowserRouter>
        </Context.Provider>

  );
}

export default App;
