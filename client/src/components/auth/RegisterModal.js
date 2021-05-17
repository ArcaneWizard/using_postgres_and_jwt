import React, { Fragment, useState, useContext, createContext } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';
import { register } from '../../actions/authActions';
import { login } from '../../actions/authActions';
import { REGISTER_FAIL, LOGIN_FAIL } from "../../actions/types";
import { clearErrors } from '../../actions/errorActions';
import Logout from './Logout';

function RegisterModal(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [option, setOption] = useState(props.mode);
    const mode = props.mode;

    let [msg, setMsg] = useState(null);

    const resetEverything = () => {
        setEmail('');
        setPassword('');
        setName('');
        setMsg(null);
    }

    const { error, isAuthenticated, user } = props;

    useEffect(() => {
        if (option == "Register") {
            if (error.id === REGISTER_FAIL) {
                setMsg(error.msg.msg);
            } else {
                setMsg(null);
            }

            if (isAuthenticated) {
                props.setTheMode("Logout");
                props.refreshTodos();
                setMsg("You successfully registered");
            }
        }
        else {
            if (error.id === LOGIN_FAIL) {
                setMsg(error.msg.msg);
            } else {
                setMsg(null);
            }

            if (isAuthenticated) {
                props.setTheMode("Logout");
                props.refreshTodos();
                setMsg("You successfully logged in");
            }
        }
    }, [error, isAuthenticated]);

    useEffect(() => {
        props.refreshTodos();
    }, [isAuthenticated])

    const onSubmitForm = () => {

        //Create user object
        const newUser = {
            name,
            email,
            password
        };

        props.register(newUser);
    };

    const onSubmitForm2 = () => {

        //Create user object
        const newUser = {
            email,
            password
        };

        props.login(newUser);
    };

    const title = (mode == "Register") ? "Register" : "Login";

    return (<div>

        {/*------------------------------The navbar at the top of the page-------------------------------*/}
        <div class="container-fluid bg-dark" style={{ width: "160%", marginLeft: "-30%" }}>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark container" style={{ width: "60%" }} >
                <h3 class="navbar-brand">Todo List</h3>

                <div class="ml-auto" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            {
                                //If the user is logged in, they see a welcome message and a logout button
                                //If the user isn't logged in yet, they see a login and signup button
                                (user)
                                    ? currentlyLoggedIn(user, props.setTheMode)
                                    : haventLoggedIn(resetEverything, props.refreshTodos)
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        {/*-------------------The two modal popups for signing in or logging in-----------------------------
        ------------------------------------FIRST, THE SIGN IN MODAL -------------------------------------- */}
        <div className="modal fade" id={`myModal`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">{title}</h3>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { resetEverything(); clearErrors(); }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {registerMsgDetector(msg)}
                        <label style={{ display: "inline-block" }}>Name: </label>
                        <input id="hi" className="form-control mb-3" value={name} onChange={e => setName(e.target.value)} />
                        <label style={{ display: "inline-block" }}>Email: </label>
                        <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} />
                        <label style={{ display: "inline-block" }}>Password: </label>
                        <input className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary bg-dark ml-0" onClick={() => { setOption("Register"); onSubmitForm() }}> {title} </button>
                    </div>
                </div>
            </div>
        </ div >

        {/*-----------------------------------SECOND, THE LOGIN IN MODAL ------------------------------------ */}
        <div className="modal fade" id={`myModal2`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { resetEverything(); clearErrors(); }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {loginMsgDetector(msg)}
                        <label style={{ display: "inline-block" }}>Email: </label>
                        <input className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} />
                        <label style={{ display: "inline-block" }}>Password: </label>
                        <input className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary bg-dark ml-0" onClick={() => { setOption("Login"); onSubmitForm2() }}> Login </button>
                    </div>
                </div>
            </div>
        </ div >
    </div >
    );
}

//returns a signup and login button for the home page
function haventLoggedIn(resetEverything, refreshTodos) {
    return (<div>
        <a class="nav-link navbar-brand" data-bs-toggle="modal" data-target="#myModal"
            href="#myModal" onClick={() => resetEverything()}>Register</a>
        <a class="nav-link navbar-brand" data-bs-toggle="modal" data-target="#myModal2"
            href="#myModal2" onClick={() => resetEverything()}>Login</a>
    </div>);
}

//returns a welcome message and logout button for the home page
function currentlyLoggedIn(user, setTheMode) {
    return (<div>
        <h3 class="navbar-brand">Welcome {user.name}</h3>
        <Logout setTheMode={setTheMode} />

    </div>);
}

//type checking for props in this function (helps catch errors and null values)
RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object
}

//Alert the user about any error they get while filling out the registration form
function registerMsgDetector(msg) {
    if (msg == "You successfully registered")
        return <div class="alert alert-primary" role="alert"> {msg} </div>
    else if (msg)
        return <div class="alert alert-danger" role="alert"> {msg} </div>
    else
        return null;
}


//Alert the user about any error they get while filling out the login form
function loginMsgDetector(msg) {
    if (msg == "You successfully logged in")
        return <div class="alert alert-primary" role="alert"> {msg} </div>
    else if (msg)
        return <div class="alert alert-danger" role="alert"> {msg} </div>
    else
        return null;
}


//Returns the value of the prop before it was last updated
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

//converts state from the redux store/reducers into props for this function
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
})

export default connect(mapStateToProps, { register, login, clearErrors })(RegisterModal);