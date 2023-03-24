import React, { useState } from 'react'
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post('/auth/login', {email, password});
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailed());
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>        
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Login</button>
        <span>
          You don't have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login