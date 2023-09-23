import React, { useContext} from "react";
import Login  from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Project from "./Project";
import Navbar from "./Navbar";
import Home from "./Home";
import  {MyContext} from "./Context";

import TaskOfProject from "./TaskOfProject";
import Tache from "./Tache";



function App() {

    const ctx = useContext(MyContext);
    return (
            <BrowserRouter>

                    <Navbar />

                    <Routes>

                        <Route path="/" exact element={<Home />} />

                        {ctx ? (
                                <>
                                    <Route path="/projects" element={<Project />} />
                                    <Route path="/projects/:projectId" element={< TaskOfProject/>} />
                                    <Route path="/taches" element={<Tache />} />
                                </>
                            )
                            :
                            (
                                <Route path="/login" element={<Login />} />
                            )
                        }




                    </Routes>


            </BrowserRouter>

  );
}

export default App;
