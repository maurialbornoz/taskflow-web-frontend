import React, {Fragment, useState, useContext} from 'react'

import projectContext from '../../context/proyectos/projectContext';
const NewProject = () => {


    // get form state
    const {form, formError, showForm, addProject, showError } = useContext(projectContext);


    // state
    const [project, saveProject] = useState({
        name: ''
    });

    // extract project name
    const {name} = project;


    // read input 
    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    // submit a project
    const onSubmitProject = e => {
        e.preventDefault();

        // project validation
        if(name === ''){
            showError();
            return;
        }

        // state 
        addProject(project);

        // reload form
        saveProject({
            name: ''
        })
    }

    const onClickForm = () => {
        showForm();
    }

    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-primary btn-block'
                onClick={onClickForm}
            >New Project</button>

            {form ?
                (
                    <form 
                        className='new-project-form'
                        onSubmit={onSubmitProject}
                        
                    >
                        <input 
                            type="text" 
                            className='input-text'
                            placeholder='Project Name'
                            name='name'
                            value={name}
                            onChange={onChangeProject}
                        />
        
                        <input 
                            type="submit" 
                            className='btn btn-primary btn-block'    
                            value="Add Project"
                        />
                    </form>
                ) : null
            }

            { formError ? <p className="mensaje error">The project name is required.</p> : null }

        </Fragment>
       
     );
}
 
export default NewProject;