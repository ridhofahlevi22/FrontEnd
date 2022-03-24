// import React from "react";
// import { serv } from './service/axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        localStorage.removeItem('user');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {

        dispatch(receiveLogin());
        console.log("data belakang: ", creds);
        if (creds.email.length > 0 && creds.password.length > 0) {
            localStorage.setItem('authenticated', true)
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}
