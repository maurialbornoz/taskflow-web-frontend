import {
    PROJECT_FORM, 
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    CLEAN_PROJECT_STATE
} from '../../types';

const projectReducer = (state, action) => {
    switch(action.type){
        case PROJECT_FORM:
            return{
                ...state,
                form: true
            }
        case GET_PROJECTS:
            //console.log(action.payload);
            return{
                ...state,
                projects: action.payload
            } 
        case ADD_PROJECT:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false
            }
        case VALIDATE_FORM:
            return{
                ...state,
                formError: true
            }
        case CURRENT_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROJECT_ERROR:
            return{
                ...state,
                message: action.payload
            }
        case CLEAN_PROJECT_STATE: 
            return {
                projects : [],
                form : false,
                formError: false,
                project: null,
                message: null
            }

        default:
            return state;
    }
}

export default projectReducer;