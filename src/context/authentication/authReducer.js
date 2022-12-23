import {
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    GET_USER,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    LOG_OUT,
    CLEAN_MESSAGE
} from '../../types';

function authReducer(state, action){
    switch(action.type){ 
        case SUCCESSFUL_REGISTRATION:
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload.token);
            
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return{
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
            
        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTRATION_ERROR:
            
            localStorage.removeItem('token');
           
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        case CLEAN_MESSAGE:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export default authReducer;