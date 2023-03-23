import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: email,
        password: password
      }, {withCredentials: true});
      console.log('Response:', response.data);
      setIsLoggedIn(true);
      console.log(isLoggedIn)
      // Handle successful login
    } catch (error) {
      console.error('Error:', error);
      // Handle login error
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

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