import React, {useState, useReducer, useContext} from 'react';

import Cookies from "js-cookie";
import axios from 'axios';
import {API_URL} from "./config";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";




function Login() {
    const [cookies] = useCookies();

    const navigate = useNavigate();

    const initialState = {
        name: '',
        username: '',
        email: '',
        password: '',
        loading: false,
        error: null,
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'SET_NAME':
                return {...state, name: action.payload};
            case 'SET_USERNAME':
                return {...state, username: action.payload};
            case 'SET_EMAIL':
                return {...state, email: action.payload};
            case 'SET_PASSWORD':
                return {...state, password: action.payload};
            default:
                return state;
        }}

        const [state, dispatch] = useReducer(reducer, initialState);
       // const [isAuthenticated, setIsAuthenticated] = useState(false);

        const [justifyActive, setJustifyActive] = useState('tab1');



        const handleJustifyClick = (value) => {
            if (value === justifyActive) {
                return;
            }
            setJustifyActive(value);
        };

        const handleNameChangeRegister = (event) => {
            dispatch({type: 'SET_NAME', payload: event.target.value});
        }
        const handleUsernameChangeRegister = (event) => {
            dispatch({type: 'SET_USERNAME', payload: event.target.value});
        }

        const handleEmailChangeRegister = (event) => {
            dispatch({type: 'SET_EMAIL', payload: event.target.value});
        }


        const handlePasswordChangeRegister = (event) => {
            dispatch({type: 'SET_PASSWORD', payload: event.target.value});
        };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/signup`, state);
           if (response.data.success){
               //
               handleJustifyClick('tab1') ;
           }
            else{
                console.log("Error d authentification ")
           }
        }
        catch (error) {
            console.log("Erreur Backend" +error);
        } }

    const handleEmailChangeLogin = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target.value});
    }


    const handlePasswordChangeLogin = (event) => {
        dispatch({type: 'SET_PASSWORD', payload: event.target.value});
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const response = await axios.post(`${API_URL}/login`, state);


    }


    return (
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>

                        <div className="text-center mb-3">
                            <p>Sign in with:</p>

                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='facebook-f' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='twitter' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='google' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='github' size="sm"/>
                                </MDBBtn>
                            </div>

                            <p className="text-center mt-3">or:</p>
                        </div>
                        <form onSubmit={handleSubmitLogin}>
                            <MDBInput
                                value={state.email}
                                onChange={handleEmailChangeLogin}
                                wrapperClass='mb-4'
                                label='Email address'
                                id='form1'
                                type='email'
                            />
                            <MDBInput
                                value={state.password}
                                onChange={handlePasswordChangeLogin}
                                wrapperClass='mb-4'
                                label='Password'
                                id='form2'
                                type='password'/>

                            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

                        </form>


                        {/*<div className="d-flex justify-content-between mx-4 mb-4">*/}
                        {/*    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>*/}
                        {/*    <a href="!#">Forgot password?</a>*/}
                        {/*</div>*/}

                        <hr className="my-4"/>

                        <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                            <MDBIcon fab icon="google" className="mx-2"/>
                            Sign in with google
                        </MDBBtn>

                        <p className="text-center">Not a member? <a onClick={() => handleJustifyClick('tab2')}
                                                                    active={justifyActive === 'tab2'}
                                                                    href="#!">Register</a></p>

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>

                        <div className="text-center mb-3">
                            <p>Sign un with:</p>

                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='facebook-f' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='twitter' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='google' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                    <MDBIcon fab icon='github' size="sm"/>
                                </MDBBtn>
                            </div>

                            <p className="text-center mt-3">or:</p>
                        </div>
                        <form onSubmit={handleSubmitRegister}>
                            <MDBInput
                                value={state.name}
                                onChange={handleNameChangeRegister}
                                wrapperClass='mb-4' label='Name' id='form1' type='text'/>

                            <MDBInput
                                value={state.username}
                                onChange={handleUsernameChangeRegister}

                                wrapperClass='mb-4' label='Username' id='form1' type='text'/>
                            <MDBInput
                                value={state.email}
                                onChange={handleEmailChangeRegister}
                                wrapperClass='mb-4' label='Email' id='form1' type='email'/>
                            <MDBInput
                                value={state.password}
                                onChange={handlePasswordChangeRegister}
                                wrapperClass='mb-4' label='Password' id='form1' type='password'/>

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault'
                                             label='I have read and agree to the terms'/>
                            </div>

                            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                        </form>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
        );
    }


export default Login;