import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_URL} from "./config";
import TaskList from "./TaskList";

function TaskOfProject() {

    const { projectId } = useParams();


    const [tasks, setTasks] = useState([]);

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
                const promises = taskIds.map((taskId) => getTask(taskId));
                Promise.all(promises)
                    .then((tasks) => {
                        setTasks(tasks);
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

    function deleteTask(id) {
        const taskToDelete = tasks[id]; // Get the project to be deleted
        const taskId = taskToDelete._id;

        axios
            .delete(`${API_URL}/taches/${taskId}`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.status === 204) {

                    //updateProjectWithTheDeletedTask();


                    setTasks((prevItems) => {
                        return prevItems.filter((item, index) => {
                            return index !== id;
                        });
                    });
                }
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }


    return (
        <div>
            <h2>Tâches du Projet {projectId}</h2>



            <div className="container">
                <div className="row">
                    <div className="col-2 border">
                        <p>To Do</p>

                        {tasks
                                .filter((task) => task.etat === "todo")
                                .map((task,index) => (
                                   <TaskList
                                       key={index}
                                       id={index}
                                       titre={task.titre}
                                       _id={task._id}
                                       evolution={task.evolution}
                                       delete={deleteTask}
                                   />
                        ))}

                    </div>
                    <div className="col-2 mx-5 border">
                        <p>Doing</p>
                        <ul>
                            {tasks
                                .filter((task) => task.etat === "doing")
                                .map((task) => (
                                    <li key={task.id}>{task.titre}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-2 mx-5 border">
                        <p>To Validate</p>
                        <ul>
                            {tasks
                                .filter((task) => task.etat === "tovalidate")
                                .map((task) => (
                                    <li key={task.id}>{task.titre}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-2 mx-5 border">
                        <p>Done</p>
                        <ul>
                            {tasks
                                .filter((task) => task.etat === "done")
                                .map((task) => (
                                    <li key={task.id}>{task.titre}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default TaskOfProject;
