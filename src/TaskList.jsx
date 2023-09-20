import React from "react";

function TaskList(props){
    return(
        <div>
            <div className="container">
                <ul>
                    <li>{props.titre}</li>
                    <li>{props.id}</li>
                    <button type="button"
                            onClick={(event) => {
                                props.delete(props.id);
                                event.preventDefault();
                            }}
                            className="btn btn-link btn-lg btn-rounded">
                        <i className="far fa-trash-can"></i>
                    </button>
                </ul>

            </div>
        </div>
    )
}

export default TaskList ;