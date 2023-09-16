import React, {useEffect, useState} from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol, MDBBtn
} from 'mdb-react-ui-kit';
import Sidebar from "./Sidebar";
import ProjectBar from "./ProjectBar";
import axios from "axios";
import {API_URL} from "./config";
import Modal from "react-modal";


function Project() {

    const [projects, setProjects] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModel(){
        setModalIsOpen(!modalIsOpen)
    }


    // function addProject(){
    //
    // }
    function deleteProject(id) {

        const projectToDelete = projects[id]; // Get the project to be deleted
        const projectId = projectToDelete._id;

        axios
            .delete(`${API_URL}/projects/${projectId}`, { withCredentials: true })
            .then((res) => {
                if (res.status === 204) {
                    setProjects((prevItems) => {
                        return prevItems.filter((item, index) => {
                            return index !== id;
                        });
                    });
                }
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    }

    useEffect(()=>{
        axios.get(`${API_URL}/projects`,{withCredentials:true})
            .then(res=>{
                setProjects(res.data)
                console.log(res.data)
            })
    },[])

    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-6">
                    <Sidebar />
                </div>
                <div className="col-lg-9 col-md-8 col-6">
                    <table className="table align-middle mb-0 bg-white">
                        <thead className="bg-light">
                        <tr>
                            <th>Name</th>
                            <th>Evolution</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                    {projects.map((p, index) => {
                        return (
                            <ProjectBar
                                key={index}
                                id={index}
                                _id={p._id}
                                nom={p.nom}
                                evolution={p.evolution}
                                etat={p.etat}
                                delete={deleteProject}

                            />
                        );
                    })}
                    </table>

                    <div style={{ marginTop: 40, marginLeft: 30}}>
                        <MDBBtn
                            onClick={toggleModel}
                            color='info'>
                            Add Project
                        </MDBBtn>
                    </div>

                        <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={toggleModel}
                        contentLabel="Add Project Modal"

                        style={{
                        overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                        content: {
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px', // Adjust the width as needed
                        padding: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                    }}>
                            <p>Hello</p>
                            <button onClick={toggleModel}>Close</button>
                        </Modal>


                </div>
            </div>

        </>



    );
}

export default Project;








