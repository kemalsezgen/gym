import React from 'react'
import { useSelector } from "react-redux";

import { toCamelCase } from '../utils/camelCase';

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='profile-container'>
      <div className='profile-header'>
          <img src={currentUser.photo ? currentUser.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='trainer' />
          <h2>{toCamelCase(currentUser.name) + " " + toCamelCase(currentUser.surname)}</h2>
      </div>
      <div className='profile-body'>

      </div>
    </div>
  )
}

export default Profile