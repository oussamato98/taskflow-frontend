import React from "react";

function TaskListWithoutDeleteButton(props){
    return(
        <div className="border-task-list">
            <div className="container">
                <p style={{ display: 'inline-block' }}>{props.titre}</p>
                <button
                    onClick={()=>{
                        window.location.href = '/detailtache/'+props.id
                    }
                    }
                >
                    <i className="fas fa-angles-down"></i>
                </button>
            </div>

        </div>
    )
}

export default TaskListWithoutDeleteButton ;