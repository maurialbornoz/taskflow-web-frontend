import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import AuthContext from '../../context/authentication/authContext';

const Projects = () => {
    
    const {authenticatedUser} = useContext(AuthContext);

    useEffect(() => {
        authenticatedUser(localStorage.getItem('token'));
           // eslint-disable-next-line
    }, []);

    return ( 
        <div className="app-container">
            <Sidebar/>

            <div className="main-section">
                <Header/>
                <main>
                    <TaskForm />
                    <div className="task-container">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;