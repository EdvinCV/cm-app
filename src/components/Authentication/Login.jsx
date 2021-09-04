import React, {useEffect} from 'react';
import LoginForm from './LoginForm';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../Redux/actions/loginActions';
import {useHistory} from 'react-router-dom';
import './login.css';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (values) => {
        dispatch(loginUser(values));   
    }

    const authenticated = useSelector((state) => state.authentication.authenticated);

    useEffect(() => {
        if(authenticated){
            history.push('/home');
        }
    }, [authenticated, history]);

    return (
        <div className="log-container">
        <div className="log-card">
            <div className="card-transparent m-3 card-login">
                <div
                    style={{backgroundColor: "white", borderRadius:"10px", opacity:0.7}}
                >
                    <img className="card-img-top" src="icons/Logo.png" alt="ChatMovil" style={{width:"280px", margin:"0 auto"}}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">BIENVENIDO</h5>
                    <LoginForm
                        onSubmit={handleLogin}
                    />
                    <p className="card-text"><small className="text-muted">Sistema ChatMóvil - {new Date().getFullYear()}</small></p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;