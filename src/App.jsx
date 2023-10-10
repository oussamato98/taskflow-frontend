import React, { useContext} from "react";
import Login  from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Project from "./Project";
import Navbar from "./Navbar";
import Home from "./Home";
import  {MyContext} from "./Context";

import TaskOfProject from "./TaskOfProject";
import Tache from "./Tache";
import DetailTache from "./DetailTache";
import Notification from "./Notification";



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
                                    <Route path="/tachesuser" element={<Tache />} />
                                    <Route path="/detailtache/:tacheId" element={<DetailTache />}/>
                                    <Route path="/notifications" element={<Notification />}/>


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
