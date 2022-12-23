import React, {useContext, useEffect} from 'react'
import Project from './Project';
import projectContext from '../../context/proyectos/projectContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {

    const {message, projects, getProjects} = useContext(projectContext);

    const {alert, showAlert} = useContext(AlertContext);

    useEffect(() => {
        if(message){
            showAlert(message.msg, message.category);
        }
        
        getProjects();
    // eslint-disable-next-line
    },[message]);

    if(projects.length === 0) return <p>Start by creating a project</p>;



    return ( 

        <ul className="projects-list">
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        className="proyecto"
                    >
                        <Project
                            
                            project={project}
                        />
                    </CSSTransition>
              
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectList;