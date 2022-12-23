import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import {
    PROJECT_TASKS ,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK,
    CLEAN_TASK_STATE
} from '../../types';
import axiosClient from '../../config/axios';


const TaskState = props => {
    const initialState = {
        projecttasks : [],
        taskerror : false,
        selectedtask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getTasks = async project => {

        // project is projectId
        try {
            const result = await axiosClient.get('/api/tasks', {params: {project}}); 
            
            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }


    // add a task to the selected project
    const addTask = async task => {
        
        try {
            const result = await axiosClient.post('/api/tasks', task);
            
            dispatch({
                type: ADD_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    // validate task and show error if necessary
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // delete task by id
    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params: {project}});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    // // change task state
    // const changeTaskState = task => {
    //     dispatch({
    //         type: TASK_STATE,
    //         payload: task
    //     })
    // }

    // extract task to edit
    const saveCurrentTask = task => {
        
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    // edit or create a task
    const updateTask = async task => {
        
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            // console.log(result);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    

    // delete selected task
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    const cleanTaskState = () => {
        dispatch({
            type: CLEAN_TASK_STATE
        })
    }

    return (
        <TaskContext.Provider
            value={{
                // states

                projecttasks : state.projecttasks,
                taskerror : state.taskerror,
                selectedtask: state.selectedtask,

                // functions
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                // changeTaskState,
                saveCurrentTask,
                updateTask,
                cleanTask,
                cleanTaskState
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;