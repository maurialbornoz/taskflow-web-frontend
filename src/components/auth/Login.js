import React, {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';
const Login = () => {

    const history = useNavigate();
    // extract from context
    const {alert, showAlert} = useContext(AlertContext);
    const {message, authenticated, logIn, cleanMessage} = useContext(AuthContext);

    useEffect(() => {
        if(authenticated){
            // props.history.push('/projects');
            history('/projects');
        }
        if(message){
            showAlert(message.msg, message.category);
            cleanMessage()
        }
    // eslint-disable-next-line
    }, [message, authenticated, history]);

    // State to log in
    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    // Extract from user
    const {email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // User wants to login
    const onSubmit = e => {
        e.preventDefault();
        // validate empty imputs
        if(email.trim() === '' || password.trim() === ''){
            showAlert('All fields are required', 'alert-error');

        }
        logIn({email, password});
    }
    return ( 


        <div className="user-form">
            {alert ? ( <div className={`alert ${alert.category}`}>{alert.msg}</div> ) : null}
            <div className="form-container dark-shadow">
                <h1>Log In</h1>

                <form 
                    onSubmit={onSubmit}
                >
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Your Email'
                            value={email}
                            onChange={onChange}
                         />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Your Password'
                            value={password}
                            onChange={onChange}
                         />
                    </div>

                    <div className="form-field">
                        <input type="submit" className="btn btn-primary btn-block" value="Log In"/>
                    </div>
                </form>

                <Link to={'/new-account'} className="link-account">
                    New Account
                </Link>

            </div>
        </div>
     );
}
 
export default Login;