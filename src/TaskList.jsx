import React from "react";

function TaskList(props){
    return(
        <div className="border-task-list">
            <div className="container">
                <p style={{ display: 'inline-block' }}>{props.titre}</p>
                <button
                    type="button"
                    onClick={(event) => {
                        props.delete(props.id);
                        event.preventDefault();
                    }}
                    className="btn btn-link btn-lg btn-rounded"
                >
                    <i className="far fa-trash-can"></i>
                </button>
            </div>

        </div>
    )
}

export default TaskList ;