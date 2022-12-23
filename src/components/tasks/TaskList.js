import React, {Fragment, useContext} from 'react';
import projectContext from '../../context/proyectos/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Task from './Task';

const TaskList = () => {

    // extract projects from initial state
    const {project, deleteProject} = useContext(projectContext);

    const {projecttasks} = useContext(taskContext);

    if(!project) return <h2>Select a project</h2>

    // array destructuring
    const [currentProject] = project;


    // delete a project
    const onClickDelete = () => {
        deleteProject(currentProject._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.name}</h2>
           
            <ul className="task-list">
                {projecttasks.length === 0
                    ? (
                        <li className="task"><p>No Tasks</p></li>
                    )
                    :   
                    <TransitionGroup>
                        {projecttasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200} //ms
                                classNames="task"
                            >
                                
                                <Task
                                    
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                }

            </ul>

            <button
                type='button'
                className='btn btn-delete'
                onClick={onClickDelete}
            >Delete Project &times;</button>
           

        </Fragment>
       
     );
}
 
export default TaskList;