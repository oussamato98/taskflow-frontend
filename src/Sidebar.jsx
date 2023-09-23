import React from "react";

function Sidebar(){
    return(



                    <div style={{marginTop: 30}}
                        className="list-group list-group-flush">

                        <a href="/projects" className="list-group-item list-group-item-action ripple">
                            <i className="fas fa-briefcase fa-fw me-3"></i><span>Projets</span>
                        </a>
                        <a href="/taches" className="list-group-item list-group-item-action ripple">
                            <i className="fas fa-bars fa-fw me-3"></i><span>Taches</span>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action ripple">
                            <i className="fas fa-envelope fa-fw me-3"></i><span>Notifications</span>
                        </a>
                    </div>



    )
}

export default Sidebar;