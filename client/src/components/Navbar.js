import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../redux/userSlice";

export default function Navbar() {

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='nav'>
      <a href="/" className="site-title">
        KEMAL GYM
      </a>
      <ul>
        {
          currentUser ? (
            <li>
            <a href='/trainers'>Trainers</a>
          </li>
          ) : null
        }
        <li>
          <a href='/about'>Who We Are</a>
        </li>
        {
          currentUser ? (
            <li>
              <a id="user-name" href={`/profile/${currentUser._id}`}>{`${currentUser.name}`}</a>
              <ul>
                <li>
                <Link to="login">
                  <a href='/' onClick={handleLogout}>Çıkış yap</a>
                </Link>
                </li>
              </ul>
            </li>
          ) : null
        }
      </ul>
    </nav>
  )
}
