import React, { useReducer } from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
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
import axiosClient from '../../config/axios';


const ProyectState = props =>{

    const initialState = {
        projects : [],
        form : false,
        formError: false,
        project: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    //get projects
    const getProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
            
        }
    }

    // add new project
    const addProject = async project => {


        try {
            const result = await axiosClient.post('/api/projects', project);
            //console.log(result);
            // insert project
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // validate form
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // select project
    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    // delete a project
    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }

    }

    const cleanProjectState = () => {
        dispatch({
            type: CLEAN_PROJECT_STATE
        })
    }


    return (
        <projectContext.Provider
            value={{
                //states 
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,
                message: state.message,
                //functions
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject,
                cleanProjectState
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProyectState;
