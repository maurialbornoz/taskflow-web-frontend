import React, {useContext, useState, useEffect} from 'react';
import projectContext from '../../context/proyectos/projectContext';
import taskContext from '../../context/tasks/taskContext';
const TaskForm = () => {
    // extract if there is an active project
    const {project} = useContext(projectContext);

    const {taskerror, selectedtask, addTask, validateTask, getTasks, updateTask, cleanTask} = useContext(taskContext);

    // effect that detect if there is a selected task
    useEffect(() => {
        if(selectedtask !== null){
            saveTask(selectedtask)
        } else {
            saveTask({name: ''})
        }
    }, [selectedtask]);

    // form state
    const [task, saveTask] = useState({
        name: ''
    })

    // extract project name
    const {name} = task;

    if(!project) return null;

    // array destructuring
    const [currentProject] = project;

    // read form values
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // validate task
        if(name.trim() === ''){
            validateTask();
            return;
        }

        // check if is edition or creation of a task
        if(selectedtask === null){
            // add the new task to the state
            task.project = currentProject._id;
            
            addTask(task);
        } else {
            // update existing task
            updateTask(task);

            // delete selected task from state
            cleanTask();
        }
        
        // get and filter current project tasks
        getTasks(currentProject._id);

        // reload form
        saveTask({
            name: ''
        })
    }

    return ( 
        <div className="task-form">
            <form 
                onSubmit={onSubmit}        
            >
                <div className="input-container">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Task Name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <input 
                        type="submit" 
                        className='btn btn-primary btn-block'
                        value={selectedtask ? 'Edit Task' : "Add Task"}
                    />
                </div>
            </form>

            {taskerror ? <p className="mensaje error">Task name is required</p> : null}
        </div>
     );
}
 
export default TaskForm;