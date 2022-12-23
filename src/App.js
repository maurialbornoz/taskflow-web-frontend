import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProjectState from './context/proyectos/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authentication/authState';
import authToken from './config/token';
import PrivateRoute from './components/routes/privateRoute';


// check if there is a token
const token = localStorage.getItem('token');
if(token){
  authToken(token);
}

function App() {

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/new-account" element={<NewAccount/>} />
                {/* <PrivateRoute  element={  <Projects/>} /> */}
                <Route 
                  
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  }
                />

                
              </Routes>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
      
    </ProjectState>
 
  );
}

export default App;
