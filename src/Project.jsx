import React, { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import Sidebar from "./Sidebar";


function Project() {
    //
    // const [verticalActive, setVerticalActive] = useState('tab1');
    //
    // const handleVerticalClick = (value) => {
    //     if (value === verticalActive) {
    //         return;
    //     }
    //
    //     setVerticalActive(value);
    // };


    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-6">
                    <Sidebar />
                </div>
                <div className="col-lg-9 col-md-8 col-6">
                    <p>Content</p>
                </div>
            </div>
        </>



    );
}

export default Project;








