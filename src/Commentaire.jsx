import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import { API_URL } from "./config";
import { MyContext } from "./Context";

function Commentaire(props) {
    const [comments, setComments] = useState([]);
    const [contenu, setContenu] = useState("");
    const user = useContext(MyContext);
    const [isLiked, setIsLiked] = useState([]);
    const inputRef = useRef(); // Créez une référence pour notre input pour le renitialiser
    const tacheId=props.taskId;



    useEffect(() => {
        axios
            .get(`${API_URL}/commentaires/${tacheId}` , { withCredentials: true })
            .then((response) => {
                const data = response.data;
                setComments(data);
                const initialIsLiked = data.map(() => false);
                setIsLiked(initialIsLiked);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des projets :",
                    error
                );
            });
    }, []);

    function handleChange(event) {
        const newValue = event.target.value;
        setContenu(newValue);
    }
    function submitForm(contenu) {
        const newComment = {
            contenu: contenu,
            like: 0,
            ecrivain: user,
            tache: props.taskId,
        };
        axios
            .post(`${API_URL}/commentaires`, newComment, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data.nouveauCommentaire);
                setComments((prevcomments) => {
                    return [...prevcomments, response.data.nouveauCommentaire];
                });
                inputRef.current.value = ""

            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des commentaires :",
                    error
                );
            });


    }


    function upLike(commentId) {
        console.log(isLiked);
        axios
            .patch(`${API_URL}/commentaires/${commentId}/like`)
            .then((response) => {
                // Mettre à jour l'état des commentaires avec le nombre de likes actualisé
                const updatedComments = comments.map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, like: response.data.like };
                    }
                    return comment;
                });
                setComments(updatedComments);
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du like :", error);
            });
    }

    function downLike(commentId) {
        console.log(isLiked);

        axios
            .patch(`${API_URL}/commentaires/${commentId}/dislike`)
            .then((response) => {
                // Mettre à jour l'état des commentaires avec le nombre de likes actualisé
                const updatedComments = comments.map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, like: response.data.like };
                    }
                    return comment;
                });
                setComments(updatedComments);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du like :", error);
            });
    }

    function deleteComment(id){
            axios
                .delete(`${API_URL}/commentaires/${id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.status === 204) {
                        console.log("deleted succesfully")
                        setComments((prevItems) => {
                            return prevItems.filter((item) => {
                                return item._id !== id;
                            });
                        });
                     }
                })

    }
    return (
        <>
            <div className="row d-flex justify-content-start mx-0">
                <div className="col-md-8 col-lg-6 mx-0">
                    <div
                        className="card shadow-0 border"
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <div className="card-body p-4">
                            <div className="form-outline mb-4">
                                <form
                                    onSubmit={(event) => {
                                        submitForm(contenu);
                                        event.preventDefault();
                                    }}
                                >
                                    <input
                                        ref={inputRef}
                                        onChange={handleChange}
                                        name="contenu"
                                        value={comments.contenu}
                                        type="text"
                                        id="addANote"
                                        className="form-control"
                                        placeholder="Type comment..."
                                    />

                                    <label
                                        className="form-label"
                                        htmlFor="addANote"
                                    >
                                        + Add Comment
                                    </label>
                                </form>
                            </div>
                            {
                                comments.map((comment,index) => (
                                    <div className="card mb-4">
                                        <div className="card-body"
                                             key={index}
                                        >
                                            <p>{comment.contenu}</p>

                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    <img
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                                                        alt="avatar"
                                                        width="25"
                                                        height="25"
                                                    />
                                                    <p className="small mb-0 ms-2">
                                                        {comment.ecrivain.name}
                                                    </p>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <button
                                                        onClick={() => {
                                                            if (!isLiked[index]) {
                                                                upLike(comment._id);
                                                            } else {
                                                                downLike(comment._id);
                                                            }
                                                            setIsLiked((prevIsLiked) => {
                                                                const updatedIsLiked = [...prevIsLiked];
                                                                updatedIsLiked[index] = !isLiked[index];
                                                                return updatedIsLiked;
                                                            });
                                                        }}

                                                        className="btn btn-link btn-sm"
                                                        style={{
                                                            marginTop:
                                                                "-0.16rem",
                                                        }}
                                                    >
                                                        <i className="far fa-thumbs-up mx-2 fa-lg text-black"></i>
                                                    </button>

                                                    <p className="small text-muted mb-0">
                                                        {comment.like}
                                                    </p>

                                                    {/*<button*/}
                                                    {/*    type="button"*/}
                                                    {/*    onClick={(event) => {*/}
                                                    {/*        deleteComment(comment._id)*/}
                                                    {/*        event.preventDefault();*/}
                                                    {/*    }}>*/}
                                                    {/*    <i className="far fa-trash-can"></i>*/}
                                                    {/*</button>*/}

                                                    {comment.ecrivain._id === user._id && (
                                                        <button
                                                            type="button"
                                                            onClick={(event) => {
                                                                deleteComment(comment._id);
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            <i className="far fa-trash-can"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Commentaire;
