import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authentication/authContext';
import projectContext from '../../context/proyectos/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Header = () => {
    const { user, authenticatedUser, logOut} = useContext(AuthContext);
    const {cleanProjectState} = useContext(projectContext)
    const {cleanTaskState} = useContext(taskContext)

    useEffect(() => {
        authenticatedUser(localStorage.getItem('token'));
        
        // eslint-disable-next-line
    }, []);

    const logOutUser = () => {
        cleanTaskState()
        cleanProjectState()
        logOut()
    }
    return ( 
        <header className="app-header">
            {user ? <p className="user-name" data-cy="hello-user">Hello <span>{user.name}</span></p> : null}
            

            <nav className="main-nav">
                <button 
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => logOutUser()}
                    data-cy="log-out"
                >Log Out</button>
            </nav>
        </header>
     );
}
 
export default Header;