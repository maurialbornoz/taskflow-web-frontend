import React, {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';
import Alert from '../layout/Alert';
const NewAccount = () => {
    const history = useNavigate();
    // extract from context
    const {alert, showAlert} = useContext(AlertContext);
    const {message, authenticated, registerUser, cleanMessage} = useContext(AuthContext);
    // console.log(props.history);
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
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    // Extract from user
    const {name, email, password, confirm} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    } 

    // User wants to NewAccount
    const onSubmit = e => {
        e.preventDefault();
        // check no empty fields
        if(name.trim() === '' || password.trim() === '' || email.trim() === '' || confirm.trim() === ''){
            showAlert('All fields are required', 'alert-error');
            return;
        }
        // password of 6 characters
        if(password.length < 6){
            showAlert('The password should have at least 6 characters', 'alert-error');
            return;
        }
        
        // password and confirmation
        if(password !== confirm){
            showAlert('Passwords are different', 'alert-error');
            return;

        }

        // pass it to action
        registerUser({
            name,
            email,
            password
        });
    }
    return ( 


        <div className="user-form">
            <Alert
                alert={alert}
            />
            <div className="form-container dark-shadow">
                <h1 data-cy="title">New Account</h1>

                <form 
                    onSubmit={onSubmit}
                    data-cy="new-account-form"
                >
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id='name'
                            name='name'
                            placeholder='Your Name'
                            value={name}
                            onChange={onChange}
                            data-cy="name-input"
                         />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Your Email'
                            value={email}
                            onChange={onChange}
                            data-cy="email-input"
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
                            data-cy="password-input"
                         />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input 
                            type="password"
                            id='confirm'
                            name='confirm'
                            placeholder='Repeat Your Password'
                            value={confirm}
                            onChange={onChange}
                            data-cy="confirm-password-input"
                         />
                    </div>

                    <div className="form-field">
                        <input 
                            type="submit" 
                            className="btn btn-primary btn-block" 
                            value="Sign Up"
                            data-cy="submit-new-account"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'} 
                    className="link-account"
                    data-cy="login-link"
                >
                    Back
                </Link>

            </div>
        </div>
     );
}
 
export default NewAccount;