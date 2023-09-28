import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_URL} from "./config";
import Commentaire from "./Commentaire";

function DetailTache(){

    const { tacheId } = useParams();
    const [task,setTasks] = useState({});
    const [project,setProject]=useState({});

    useEffect(() => {

             axios.get(`${API_URL}/taches/${tacheId}`, { withCredentials: true })
                 .then((response) => {
                     console.log(response.data[0]);
                     setTasks(response.data[0]);
                     getProjectName(response.data[0].projet);
                 })
                 .catch((error) => {
                     console.error("Erreur lors de la récupération des projets :", error);
                 });

    }, [tacheId]);

    function getProjectName(projectId){
        axios.get(`${API_URL}/projects/${projectId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data[0]);
                setProject(response.data[0])
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des projets :", error);
            });
    }







    return(
         <>
            {/*<p>detail tache {tacheId} </p>*/}


                 <div className="container">
                     <div className="mt-4 mx-auto px-3">
                         <div className="card">
                             <div className="card-body">
                                 <h5 className="card-title text-center">{task.titre}</h5>
                                 <p className="card-text">{task.contenu}</p>
                                 <ul className="list-group list-group-flush">
                                     <li className="list-group-item">
                                         <strong>État :</strong> {task.etat}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Date de début :</strong> {task.dateDebut}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Date de fin :</strong> {task.dateFin}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Évolution :</strong> {task.evolution}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Priorité :</strong> {task.priorite}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Projet :</strong> {project ? project.nom : 'Chargement...'}
                                     </li>
                                     <li className="list-group-item">
                                         <strong>Chef de projet :</strong> {project ? (project.chef ? project.chef.name : 'Non attribué') : 'Chargement...'}
                                     </li>
                                 </ul>
                             </div>
                             <Commentaire
                                 taskId={tacheId}
                             />

                         </div>
                     </div>
                 </div>





     </>
    )
}


export default DetailTache ;