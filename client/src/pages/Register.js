import React, { useState } from 'react'
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice';

const Register = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setName('');
    setSurname('');
    setUsername('');
    setType('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post('/auth/register', { name, surname, username, type, email, password });
      dispatch(loginSuccess(response.data));
      navigate('/');
      clearForm();
    } catch (error) {
      dispatch(loginFailed());
    }
  }

  return (
    <div className='container'>
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor='name'>First Name</label>
          <input value={name} type='text' name='name' placeholder='First Name' onChange={e => setName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='surname'>Last Name</label>
          <input value={surname} type='text' name='surname' placeholder='Last Name' onChange={e => setSurname(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input value={username} type='text' name='username' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='type'>User Type</label>
          <select value={type} name="type" onChange={e => setType(e.target.value)}>
            <option value="member">Member</option>
            <option value="pt">Personal Trainer</option>
          </select>
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input value={email} type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input value={password} type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Register</button>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register