import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

// const PrivateRoute = ({ component: Component, ...props}) => {
//     const {authenticated } = useContext(AuthContext);
//     console.log(authenticated);
//     return ( 
//         <Route {...props} render={props => !authenticated ? (
//             <Navigate to='/' />
//         ) : (
//             <Component {...props} />

//         ) }/>
//      );

// }

const PrivateRoute = ({ children }) => {
    const {authenticated, loading,  authenticatedUser } = useContext(AuthContext);
    useEffect(() => {
        authenticatedUser(localStorage.getItem('token'));
       // eslint-disable-next-line
    }, []);


    if (!authenticated && !loading) {
      return <Navigate  to="/" replace={true} />;
    }
  
    return children;
  }; 
export default PrivateRoute;