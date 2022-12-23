import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axios';
import authToken from '../../config/token';

import {
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    GET_USER,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    LOG_OUT,
    CLEAN_MESSAGE
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });
            
            authenticatedUser(response.data.token);
            
        } catch (error) {
            // console.log(error.response.data.msg)
            
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            })
            
        }
        
    }

    // returns authenticated user
    const authenticatedUser = async (token) => {
        
        // const token = localStorage.getItem('token');
        // const token = data.token;
        
        if(token){
            authToken(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
            
        }
    }

    // when the user logs in
    const logIn = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            // console.log(response);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });
            authenticatedUser(response.data.token);
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    // 
    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    const cleanMessage = () => {
        dispatch({
            type: CLEAN_MESSAGE
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,

                registerUser,
                logIn,
                authenticatedUser,
                logOut,
                cleanMessage
               
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;