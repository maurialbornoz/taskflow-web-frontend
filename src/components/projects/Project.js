import React, {useContext} from 'react';
import projectContext from '../../context/proyectos/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    // get form state
    const {currentProject} = useContext(projectContext);

    const {getTasks} = useContext(taskContext);

    // add current project
    const selectProject = id => {
        currentProject(id); 
        getTasks(id);
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => selectProject(project._id)}
            >{project.name}</button>
        </li>
     );
}
 
export default Project;