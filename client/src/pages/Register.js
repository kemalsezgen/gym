import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setUserType('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name: firstName,
        surname: lastName,
        type: userType,
        email: email,
        password: password
      }, {withCredentials: true});
      clearForm();
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='container'>
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input value={firstName} type='text' name='firstName' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input value={lastName} type='text' name='lastName' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='type'>User Type</label>
          <select value={userType} name="usertype" onChange={e => setUserType(e.target.value)}>
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
      <button onClick={clearForm}>Clear</button>
    </div>
  )
}

export default Register