import React from "react";


function ProjectBar(props){
    return(

            <tbody>
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{props.nom}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="text-muted mb-0">{props.evolution}</p>
                </td>
                <td>
                    <span className="badge badge-success rounded-pill d-inline">{props.etat}</span>
                </td>
                <td>
                    <button type="button"
                                onClick={(event) => {
                                props.delete(props.id);
                                event.preventDefault();
                            }}
                            className="btn btn-link btn-lg btn-rounded">
                        <i className="far fa-trash-can"></i>
                    </button>

                </td>
                <td>
                    <button type="button" className="btn btn-link btn-lg btn-rounded">
                        <i className="fas fa-pen"></i>
                    </button>
                </td>
            </tr>
            <tr>

            </tr>
            </tbody>

    )
}

export default ProjectBar;