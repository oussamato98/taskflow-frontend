import React from 'react';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';

function Notification() {
    return (
        <>


            <a className='mx-3' href='#!'>
                <MDBIcon fas icon='envelope' size='lg' />
                <MDBBadge color='danger' notification pill>
                    1
                </MDBBadge>
            </a>


        </>
    );
}

export default Notification ;