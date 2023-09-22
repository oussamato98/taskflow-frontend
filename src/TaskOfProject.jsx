import React, {useEffect, useReducer, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_URL} from "./config";
import TaskList from "./TaskList";
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import Modal from "react-modal";
import {DragDropContext} from "react-beautiful-dnd";

function TaskOfProject() {

    const { projectId } = useParams();


    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModel() {
        setModalIsOpen(!modalIsOpen);
    }

    async function getTask(taskId) {
        try {
            const response = await axios.get(`${API_URL}/taches/${taskId}`, {
                withCredentials: true,
            });
            return response.data[0]; // Supposons que le nom de la tâche est stocké dans la propriété "nom".
        } catch (error) {
            console.error(`Erreur lors de la récupération de la tâche ${taskId}:`, error);
            return null; // Gestion de l'erreur ici (vous pouvez retourner une chaîne vide ou une valeur par défaut si nécessaire).
        }
    }


    useEffect(() => {
        axios.get(`${API_URL}/projects/${projectId}`, { withCredentials: true })
            .then((res) => {
                const taskIds = res.data[0].tache;
                console.log("voici les ids des taches de ce projet ")

                console.log(res.data[0].tache)
                const promises = taskIds.map((taskId) => getTask(taskId));
                Promise.all(promises)
                    .then((tasks) => {
                        setTasks(tasks);
                        console.log("voici les taches de ce projet ")
                        console.log(tasks)
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la récupération des noms de tâches :", error);
                    });
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des tâches :", error);
            });
    }, [projectId]);

    function deleteTask(taskId) {
            axios
                .delete(`${API_URL}/taches/${taskId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.status === 204) {
                        console.log("voici la tache a supprimer du projet : "+taskId)
                        axios
                            .patch(`${API_URL}/projects/${projectId}`, { tache: taskId }, {
                                withCredentials: true,
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    setTasks((prevItems) => {
                                        return prevItems.filter((task) => {
                                            return task._id !== taskId;
                                        });
                                    });
                                }
                            })
                            .catch((error) => {
                                console.error("Error updating project after deleting task:", error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error deleting task:", error);
                });


    }

    const initialState = {
        titre: "",
        contenu: "",
        eta: "",
        dateDebut: "",
        dateFin: "",
        evolution:"",
        priorite:"",
        executeur: "",
        projet:"",
        loading: false,
        error: null,
    };

    function reducer(state, action) {
        switch (action.type) {
            case "SET_TITRE":
                return { ...state, titre: action.payload };
            case "SET_CONTENU":
                return { ...state, contenu: action.payload };
            case "SET_ETA":
                return { ...state, eta: action.payload };
            case "SET_DD":
                return { ...state, dateDebut: action.payload };
            case "SET_DF":
                return { ...state, dateFin: action.payload };
            case "SET_EVOLUTION":
                return { ...state, evolution: action.payload };
            case "SET_PRIORITE":
                return { ...state, priorite: action.payload };
            case "SET_EXECUTEUR":
                return { ...state, executeur: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleTitreChange = (event) => {
        dispatch({ type: "SET_TITRE", payload: event.target.value });
    };
    const handleContenuChange = (event) => {
        dispatch({ type: "SET_CONTENU", payload: event.target.value });
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
    const handleEvolutionChange = (event) => {
        dispatch({ type: "SET_EVOLUTION", payload: event.target.value });
    };

    const handlePrioriteChange = (event) => {
        dispatch({ type: "SET_PRIORITE", payload: event.target.value });
    };
    // const handleExecuteurChange = (event) => {
    //     dispatch({ type: "SET_EXECUTEUR", payload: event.target.value });
    // };



    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/users`)
            .then((response) => {
                setUsers(response.data); // Mettez à jour la liste des utilisateurs
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    // Fonction pour gérer les changements de sélection dans le menu déroulant
    const handleExecuteurChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleSubmitFormTask = (event) => {
        event.preventDefault();

        // Récupérez l'objet utilisateur complet par ID
        axios.get(`${API_URL}/users/${selectedUser}`, { withCredentials: true })
            .then((userResponse) => {
                const user = userResponse.data;
                console.log("voici l utilisateur selectionne")
                console.log(user)

                // Attribuez l'objet utilisateur à state.executeur

                state.executeur = user;

                // Attribuez également le projet
                state.projet = projectId;

                //Effectuez votre requête POST avec state
                axios.post(`${API_URL}/taches`, state, { withCredentials: true })
                    .then((res) => {
                        if (res.status === 201) {
                            const nouvelleTache = res.data.nouveauTache;

                            axios.get(`${API_URL}/projects/${projectId}`, { withCredentials: true })
                                .then((res) => {
                                    if (res.status === 200) {
                                        const projet = res.data[0];
                                        projet.tache.push(nouvelleTache._id);

                                        // Mettez à jour le projet avec la nouvelle tâche
                                        axios.patch(`${API_URL}/projectsupdate/${projectId}`, projet, { withCredentials: true })
                                            .then(() => {

                                                setTasks((prevItems) => {
                                                    return [...prevItems, nouvelleTache];
                                                });
                                            })
                                            .catch((error) => {
                                                console.error('Erreur lors de la mise à jour du projet :', error);
                                            });
                                    }
                                })
                                .catch((error) => {
                                    console.error('Erreur lors de la récupération du projet :', error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la création de la tâche :', error);
                    });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de lutilisateur par ID :', error);
            });
    };



    return (
<DragDropContext>
        <div>
            <h2>Tâches du Projet {projectId}</h2>


            <div className="container">
                <div className="row">
                    <div className="col-2 border">
                        <p>To Do</p>

                        {tasks
                            .filter((task) => task && task.etat === "todo")
                            .map((task) => (
                                <TaskList
                                    // key={index}
                                    // id={index}
                                    titre={task.titre}
                                    id={task._id}
                                    evolution={task.evolution}
                                    delete={deleteTask}
                                />
                            ))}

                        <div style={{ marginTop: 40, marginLeft: 30 }}>
                            <MDBBtn onClick={toggleModel} color="info">
                                Add Task
                            </MDBBtn>
                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={toggleModel}
                            contentLabel="Add Task Modal"
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
                                <form
                                    onSubmit={handleSubmitFormTask}
                                >
                                    <MDBInput
                                         value={state.titre}
                                         onChange={handleTitreChange}
                                        wrapperClass="mb-4"
                                        label="Titre"
                                        id="form1"
                                        type="text"
                                    />
                                    <MDBInput
                                         value={state.contenu}
                                         onChange={handleContenuChange}
                                        wrapperClass="mb-4"
                                        label="Contenu"
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
                                    <MDBInput
                                        value={state.evolution}
                                        onChange={handleEvolutionChange}
                                        wrapperClass="mb-4"
                                        label="Evolution"
                                        id="form3"
                                        type="text"
                                    />
                                    <MDBInput
                                        value={state.priorite}
                                        onChange={handlePrioriteChange}
                                        wrapperClass="mb-4"
                                        label="Priorite"
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

                                    <div className="container">
                                        <select
                                            className="form-select"
                                            aria-label="Sélectionnez un utilisateur"
                                            onChange={handleExecuteurChange}
                                            value={selectedUser}
                                        >
                                            <option value="" disabled>Choisissez un utilisateur</option>
                                            {users.map((user,index) => (
                                                <option
                                                    key={index}
                                                    id={index}
                                                    value={user._id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <MDBBtn className="mb-4 w-100" type="submit">
                                        Save
                                    </MDBBtn>
                                </form>
                            </div>
                            <button onClick={toggleModel}>Close</button>
                        </Modal>


                    </div>
                    <div className="col-2 mx-5 border">
                        <p>Doing</p>
                        <ul>
                            {tasks
                                .filter((task) => task && task.etat === "doing")
                                .map((task) => (
                                    <TaskList
                                        // key={index}
                                        // id={index}
                                        titre={task.titre}
                                        id={task._id}
                                        evolution={task.evolution}
                                        delete={deleteTask}
                                    />
                                ))}

                        </ul>
                    </div>
                    <div className="col-2 mx-5 border">
                        <p>To Validate</p>
                        {tasks
                            .filter((task) => task && task.etat === "tovalidate")
                            .map((task) => (
                                <TaskList
                                    // key={index}
                                    // id={index}
                                    titre={task.titre}
                                    id={task._id}
                                    evolution={task.evolution}
                                    delete={deleteTask}
                                />
                            ))}

                    </div>
                    <div className="col-2 mx-5 border">
                        <p>Done</p>
                        {tasks
                            .filter((task) => task && task.etat === "done")
                            .map((task) => (
                                <TaskList
                                    // key={index}
                                    // id={index}
                                    titre={task.titre}
                                    id={task._id}
                                    evolution={task.evolution}
                                    delete={deleteTask}
                                />
                            ))}

                    </div>
                </div>
            </div>




        </div>
</DragDropContext>
    );
}

export default TaskOfProject;
