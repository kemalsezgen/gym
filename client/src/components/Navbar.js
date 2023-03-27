import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice"

export default function Navbar() {

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='nav'>
      <a href="/" className="site-title">
        BEST GYM
      </a>
      <ul>
        <li>
          <a href='/trainers'>Trainers</a>
        </li>
        <li>
          <a href={`/profile/${currentUser.otherData._id}`}>Profile</a>
        </li>
      </ul>
    </nav>
  )
}
