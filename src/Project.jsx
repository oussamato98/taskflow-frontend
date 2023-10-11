import React, { useContext, useEffect, useReducer, useState } from "react";
import {
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import Sidebar from "./Sidebar";
import ProjectBar from "./ProjectBar";
import axios from "axios";
import { API_URL } from "./config";
import Modal from "react-modal";
import { MyContext } from "./Context";

function Project() {
    const [projects, setProjects] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const user = useContext(MyContext);

    const initialState = {
        nom: "",
        evolution: "",
        eta: "",
        dateDebut: "",
        dateFin: "",
        chef: "",
        loading: false,
        error: null,
    };

    function reducer(state, action) {
        switch (action.type) {
            case "SET_NOM":
                return { ...state, nom: action.payload };
            case "SET_EVOLUTION":
                return { ...state, evolution: action.payload };
            case "SET_ETA":
                return { ...state, eta: action.payload };
            case "SET_DD":
                return { ...state, dateDebut: action.payload };
            case "SET_DF":
                return { ...state, dateFin: action.payload };

            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNomChange = (event) => {
        dispatch({ type: "SET_NOM", payload: event.target.value });
    };
    const handleEvolutionChange = (event) => {
        dispatch({ type: "SET_EVOLUTION", payload: event.target.value });
    };
    const handleEtaChange = (event) => {
        dispatch({ type: "SET_ETA", payload: event.target.value });
    };

    const handleDDChange = (event) => {
        dispatch({ type: "SET_DD", payload: event.target.value });
    };
    const handleDFChange = (event) => {
        dispatch({ type: "SET_DF", payload: event.target.value });
    };
    function toggleModel() {
        setModalIsOpen(!modalIsOpen);
    }

    const handleSubmitFormProject = (event) => {
        event.preventDefault();
        state.chef = user;
        axios
            .post(`${API_URL}/projects`, state, { withCredentials: true })
            .then((res) => {
                if (res.status === 201) {
                    setProjects((prevItems) => {
                        return [...prevItems, res.data.nouveauProjet];
                    });
                }
            });
    };

    function deleteProject(id) {
        const projectToDelete = projects[id]; // Get the project to be deleted
        const projectId = projectToDelete._id;

        axios
            .delete(`${API_URL}/projects/${projectId}`, {
                withCredentials: true,
            })
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
                console.error("Error deleting project:", error);
            });
    }


    useEffect(() => {
        // Vérifiez si vous avez un utilisateur authentifié
        if (user) {
            // Effectuez une requête vers le backend en incluant l'identifiant de l'utilisateur
            axios.get(`${API_URL}/projects?userId=${user._id}`, { withCredentials: true })
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des projets :", error);
                });
        }
    }, [user]);

    return (
        <>
            <div className="row" style={{marginTop: 100}} >
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

                    <div style={{ marginTop: 40, marginLeft: 30 }}>
                        <MDBBtn onClick={toggleModel} color="info">
                            Add Project
                        </MDBBtn>
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={toggleModel}
                        contentLabel="Add Project Modal"
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 1000,
                            },
                            content: {
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "400px", // Adjust the width as needed
                                height: "80%",
                                padding: "10px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <div>
                            <form onSubmit={handleSubmitFormProject}>
                                <MDBInput
                                    value={state.nom}
                                    onChange={handleNomChange}
                                    wrapperClass="mb-4"
                                    label="Titre"
                                    id="form1"
                                    type="text"
                                />
                                <MDBInput
                                    value={state.evolution}
                                    onChange={handleEvolutionChange}
                                    wrapperClass="mb-4"
                                    label="Evolution"
                                    id="form2"
                                    type="text"
                                />
                                <MDBInput
                                    value={state.eta}
                                    onChange={handleEtaChange}
                                    wrapperClass="mb-4"
                                    label="Etat"
                                    id="form3"
                                    type="text"
                                />

                                <div className="container">
                                    <label>Date Debut</label>
                                    <input
                                        type="date"
                                        value={state.dateDebut}
                                        onChange={handleDDChange}
                                        id="start"
                                        name="trip-start"
                                        min="2018-01-01"
                                        max="2018-12-31"
                                    />
                                </div>
                                <div className="container">
                                    <label>Date Fin</label>
                                    <input
                                        type="date"
                                        value={state.dateFin}
                                        onChange={handleDFChange}
                                        id="start"
                                        name="trip-start"
                                        min="2018-01-01"
                                        max="2018-12-31"
                                    />
                                </div>

                                <MDBBtn className="mb-4 w-100" type="submit">
                                    Save
                                </MDBBtn>
                            </form>
                        </div>
                        <button onClick={toggleModel}>Close</button>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Project;
