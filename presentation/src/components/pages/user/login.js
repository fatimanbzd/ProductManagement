import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";

const LOGIN_URL = '/auth';

// const login() {
//
//
//     return axios.post( 'http://localhost:5172/token/login', credentials
//     )
//         .then( data => data )
// }

export default function Login() {

    const { setAuth } = useContext( AuthContext );
    const emailRef = useRef();
    const errRef = useRef();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ errMsg, setErrMsg ] = useState();
    const [ success, setSuccess ] = useState( false );
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post( LOGIN_URL, { email: email, password: password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            } )
            const accessToken = response?.data.accessToken;
            const roles = response?.data?.roles;
            setAuth( { email, password, roles, accessToken } );

            setEmail( '' );
            setPassword( '' );
            setSuccess( true );
        } catch ( e ) {
            if ( !e?.response )
                setErrMsg( 'No server response' );
            else if ( e.response?.status === 400 )
                setErrMsg( 'Missing username or password' );
            else if ( e.response?.status === 401 )
                setErrMsg( 'UnAuthorized' );
            else
                setErrMsg( 'Login Failed' );
        }
        errRef.current.focus();
    }


    // const token = await loginUser( {
    //     email,
    //     password
    // } );
    // setToken( token );

    useEffect( () => {
        emailRef.current.focus();
    }, [] );

    useEffect( () => {
        setErrMsg( '' );
    }, [ email, password ] );


    return (
        <>
            { success ? (
                <section>
                    <h1> you are logged in !</h1><br/>
                    <p>
                        <a href="#">Go to home</a>
                    </p>
                </section> ) : (
                <section>
                    <p ref={ errRef } className={ errRef ? "errmsg" : "offsscreen" }
                       aria-live="assertive">{ errMsg }</p>
                    <h1>Login</h1>

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email"
                                              placeholder="xyz@gmail.com"
                                              ref={ emailRef }
                                              autoComplete="off"
                                              onChange={ e => setEmail( e.target.value ) }
                                              value={ email }
                                              required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password"
                                              placeholder="Password"
                                              onChange={ e => setPassword( e.target.value ) }
                                              value={ password }
                                              required/>
                            </Col>
                        </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                </section>
            ) }
        </>
    )
}

