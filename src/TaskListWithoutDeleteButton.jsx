import React from "react";

function TaskListWithoutDeleteButton(props){
    return(
        <div className="border-task-list">
            <div className="container">
                <p style={{ display: 'inline-block' }}>{props.titre}</p>

            </div>

        </div>
    )
}

export default TaskListWithoutDeleteButton ;