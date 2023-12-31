import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { API_URL } from "./config";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {MyContext} from "./Context";
import TaskListWithoutDeleteButton from "./TaskListWithoutDeleteButton";


function TaskOfProject() {

    const user = useContext(MyContext);
    const [tasks, setTasks] = useState([]);



    useEffect(() => {
        axios
            .get(`${API_URL}/tachesuser?userId=${user._id}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            });
    }, [user]);



    const updateTaskStatusOnServer = (taskId, newStatus) => {
        axios
            .patch(
                `${API_URL}/taches/${taskId}`,
                { etat: newStatus },
                { withCredentials: true }
            )
            .then((res) => {
                // Mettre à jour l'état local des tâches après la mise à jour sur le serveur
                const updatedTasks = tasks.map((task) => {
                    if (task._id === taskId) {
                        task.etat = newStatus;
                    }
                    return task;
                });
                setTasks(updatedTasks);
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de la tâche sur le serveur :", error);
            });
    };

    // Gérer le déplacement de tâches
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return; // L'élément n'a pas été déposé dans une zone valide
        }

        const sourceColumn = result.source.droppableId;
        const destinationColumn = result.destination.droppableId;

        if (sourceColumn === destinationColumn) {
            return; // La tâche a été déplacée dans la même colonne, pas besoin de mise à jour
        }

        const validTransitions = ["todo-doing", "doing-todo", "doing-tovalidate", "tovalidate-doing", "todo-tovalidate", "tovalidate-todo"];

        if (validTransitions.includes(`${sourceColumn}-${destinationColumn}`)) {
            // Obtenez l'ID de la tâche déplacée
            const taskId = result.draggableId;
            // Mise à jour de l'emplacement sur le serveur
            updateTaskStatusOnServer(taskId, destinationColumn.toLowerCase());
            if (sourceColumn === "doing" && destinationColumn === "tovalidate") {
                // Exécutez votre fonction spécifique pour la transition
                notificateChefProjet(taskId);
            }

        }

    }

    function notificateChefProjet(taskId) {

        axios.get(`${API_URL}/taches/${taskId}`, {withCredentials: true})
            .then((res) => {
                // console.log(res.data[0].projet)
                const projectId = res.data[0].projet;
                axios.get(`${API_URL}/chefprojet/${projectId}`, {withCredentials: true})
                    .then((res) => {
                        console.log(res.data)
                        const chefProjet=res.data;
                        const users = {
                            emetteur: user,
                            destinataire: chefProjet
                        }
                            axios
                                .post(`${API_URL}/notificationtovalidate`, users,{ withCredentials: true })
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err)=>{console.log(err)})

                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .catch((err) => {
                        console.log(err)
                    })


            })

    }

    return (

        <DragDropContext onDragEnd={handleDragEnd}>
        <div>
            <h2>Tâches du user {user._id}</h2>

            <div className="container">
                <div className="row">
                    <div className="col-2 border">
                        <p>To Do</p>
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks
                                        .filter((task) => task && task.etat === "todo")
                                        .map((task, index) => (
                                            <Draggable
                                                key={task._id}
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <TaskListWithoutDeleteButton
                                                            titre={task.titre}
                                                            id={task._id}
                                                            evolution={task.evolution}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>



                    <div className="col-2 mx-5 border">
                            <p>Doing</p>
                            <Droppable droppableId="doing">
                                {(provided) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {tasks
                                            .filter((task) => task && task.etat === "doing")
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <TaskListWithoutDeleteButton
                                                                titre={task.titre}
                                                                id={task._id}
                                                                evolution={task.evolution}
                                                            />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                    </div>

                    <div className="col-2 mx-5 border">
                            <p>To Validate</p>
                            <Droppable droppableId="tovalidate">
                                {(provided) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {tasks
                                            .filter((task) => task && task.etat === "tovalidate")
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <TaskListWithoutDeleteButton
                                                                titre={task.titre}
                                                                id={task._id}
                                                                evolution={task.evolution}
                                                            />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                    </div>

                    <div className="col-2 mx-5 border">
                            <p>Done</p>
                            <Droppable droppableId="done">
                                {(provided) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {tasks
                                            .filter((task) => task && task.etat === "done")
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <TaskListWithoutDeleteButton
                                                                titre={task.titre}
                                                                id={task._id}
                                                                evolution={task.evolution}
                                                            />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>

                    </div>
                </div>
            </div>
        </div>


    </DragDropContext>
);
}


export default TaskOfProject;
