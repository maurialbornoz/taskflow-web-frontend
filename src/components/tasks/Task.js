import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/proyectos/projectContext';
const Task = ({task}) => {
    // extract if there is an active project
    const {project} = useContext(projectContext);

    const {deleteTask, getTasks, updateTask, saveCurrentTask} = useContext(taskContext);

    // array destructuring
    const [currentProject] = project;

    // function that executes when user click delete
    const deleteTheTask = id => {
        deleteTask(id, currentProject._id);
        getTasks(currentProject._id);
    }

    // function that change task state
    const changeState = task => {
        
        if(task.state){
            task.state = false;
        } else {
            task.state = true;
        }
        
        updateTask(task);
    }

    // when a user edits a task
    const selectTask = task => {
        saveCurrentTask(task);
    }
    
    return ( 
        <li data-cy="task" className="task shadow">
            <p>{task.name}</p>

            <div className="state">
                {task.state 
                ?
                    (
                        <button
                            type='button'
                            className='finished'
                            onClick={()=>changeState(task)}
                            data-cy="finished-task"
                            >Finished</button>
                            )
                            :
                            (
                        <button
                            type='button'
                            className='unfinished'
                            onClick={()=>changeState(task)}
                            data-cy="unfinished-task"

                        >Unfinished</button>
                    )
            }
            </div>

            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => selectTask(task)}
                    data-cy="edit-task-button"
                >Edit</button>

                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => deleteTheTask(task._id)}
                    data-cy="delete-task-button"
                >Delete</button>
            </div>
        </li>
     );
}
 
export default Task;