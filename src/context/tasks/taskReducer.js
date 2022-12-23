import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK,
    CLEAN_TASK_STATE
} from '../../types';

const taskReducer = (state, action) => {
    switch(action.type){
        case PROJECT_TASKS:
            return {
                ...state,
                projecttasks: action.payload
            }
        case ADD_TASK:
            //console.log(action.payload)
            return {
                ...state,
                projecttasks: [...state.projecttasks, action.payload],
                taskerror: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskerror: true
            }
        case DELETE_TASK:
            return {
                ...state,
                projecttasks: state.projecttasks.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                projecttasks: state.projecttasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedtask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedtask: null
            }
        case CLEAN_TASK_STATE:
            return {
                projecttasks : [],
                taskerror : false,
                selectedtask: null
            }


        default: 
            return state;
    }
}

export default taskReducer;