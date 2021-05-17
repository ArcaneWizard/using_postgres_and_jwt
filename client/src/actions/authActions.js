import axios from 'axios';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types"
import { returnErrors } from './errorActions';
import store from '../store'


//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        })).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

//Register User
export const register = ({ name, email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('http://localhost:5000/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')),
            dispatch({
                type: REGISTER_FAIL
            }))
}

//Login User
export const login = ({ email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ email, password });

    axios.post('http://localhost:5000/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')),
            dispatch({
                type: LOGIN_FAIL
            }))
}



//Logout User
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
}

// Setup config/headers and token
export const tokenConfig = () => {

    //Get token from local storage
    const token = store.getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const tokenFetchHeader = () => {
    const token = store.getState().auth.token;

    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': token,
    });

    return headers;
}
