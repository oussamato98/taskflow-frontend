import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "./config";
import {MyContext} from "./Context";


function Commentaire(props){

    const[comments,setComments]=useState([]);
    const[contenu,setContenu]=useState('');
    const user = useContext(MyContext);



    useEffect(() => {

        axios.get(`${API_URL}/commentaires`, { withCredentials: true })
            .then((response) => {
                const data = response.data;
                //console.log(data);
                // Assurez-vous que data est un tableau avant de le définir comme state
                setComments(data);



            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des projets :", error);
            });

    }, []);



    function handleChange(event) {
        const newValue = event.target.value;
        setContenu(newValue) ;
    }
    function submitForm(contenu) {

        const newComment={
            contenu: contenu,
            like : 3,
            ecrivain: user,
            tache: props.taskId
        }
        axios.post(`${API_URL}/commentaires`,newComment, { withCredentials: true })
            .then((response) => {
                console.log(response.data.nouveauCommentaire);
                setComments((prevcomments) => {
                    return [...prevcomments, response.data.nouveauCommentaire];
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des commentaires :", error);
            });
    }

    const [isLiked, setIsLiked] = useState(false);
    function upLike(id,nbrLike){
        console.log("upLike");
        setIsLiked(!isLiked);

        const incrementedLike = nbrLike+1 ;

        const like={
            id:id,
            nombreLike:incrementedLike
        }

        axios.patch(`${API_URL}/commentaires`,like, { withCredentials: true })
            .then((response) => {
                console.log("data sended");
                //setIsLiked(!isLiked);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des commentaires :", error);
            });
    }

    function downLike(id,nbrLike){
        console.log("downLike");
        setIsLiked(!isLiked);
        const decrementedLike = nbrLike-1 ;
        const like={
            id:id,
            nombreLike:decrementedLike
        }
        axios.patch(`${API_URL}/commentaires`,like, { withCredentials: true })
            .then((response) => {
                console.log("data sended");
               // setIsLiked(!isLiked);

            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des commentaires :", error);
            });

    }




    return(
        <>

                <div className="row d-flex justify-content-start mx-0">
                    <div className="col-md-8 col-lg-6 mx-0">
                        <div className="card shadow-0 border" style={{ backgroundColor: '#f0f2f5' }}>
                            <div className="card-body p-4">
                                <div className="form-outline mb-4">
                                    <form
                                        onSubmit={(event) => {
                                            submitForm(contenu);
                                            event.preventDefault();
                                        }}
                                    >
                                        <input
                                            onChange={handleChange}
                                            name="contenu"
                                            value={comments.contenu}
                                            type="text"
                                            id="addANote"
                                            className="form-control"
                                            placeholder="Type comment..."
                                        />

                                        <label className="form-label" htmlFor="addANote">+ Add Comment</label>
                                    </form>

                                </div>
                                {
                                    // Array.isArray(comments) &&
                                    comments.map((comment) => (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p>{comment.contenu}</p>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25" height="25" />
                                                <p className="small mb-0 ms-2">{comment.ecrivain.name}</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <button
                                                    onClick={() => {
                                                        if (!isLiked) {
                                                            upLike(comment._id,comment.like);
                                                        } else {
                                                            downLike(comment._id,comment.like);
                                                        }
                                                        //event.preventDefault();
                                                        //setIsLiked(!isLiked);
                                                    }}

                                                    className="btn btn-link btn-sm" style={{ marginTop: '-0.16rem' }}>
                                                    <i className="far fa-thumbs-up mx-2 fa-lg text-black"></i>
                                                </button>

                                                <p className="small text-muted mb-0">{comment.like}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>



        </>
    )
}

export default Commentaire;