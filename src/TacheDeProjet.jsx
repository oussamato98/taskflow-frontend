import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {API_URL} from "./config";

function TacheDeProjet() {

    const { projectId } = useParams();


    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        axios.get(`${API_URL}/projects/${projectId}`, { withCredentials: true })
            .then((res) => {
                setTasks(res.data[0].tache);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des tâches :", error);
            });
    }, [projectId]);

    return (
        <div>
            <h2>Tâches du Projet {projectId}</h2>
            {/*<ul>*/}
            {/*    {tasks.map((task) => (*/}
            {/*        <li key={task.id}>{task.name}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
}

export default TacheDeProjet;
