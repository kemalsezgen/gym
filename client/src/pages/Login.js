import React, { useState } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice';

import { AiOutlineUser } from 'react-icons/ai' 

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post('/auth/login', { email, password });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailed());
    }
  };

  return (
    <div className='login-container'>
      <div className='welcomeMessage'>
        <h2>Welcome to KEMAL GYM</h2>
      </div>
      <div className='loginForm'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='formInput'>
            <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='formInput'>
            <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='loginLower'>
            <button className='loginButton' type='submit'>Login</button>
            <div className='redirectText'>
              <p> You don't have an account? <a href="/register">Register</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login