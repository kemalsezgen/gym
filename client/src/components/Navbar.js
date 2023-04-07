import React from 'react'
import { useSelector } from "react-redux";

export default function Navbar() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className='nav'>
      <a href="/" className="site-title">
        KEMAL GYM
      </a>
      <ul>
        <li>
          <a href='/trainers'>Trainers</a>
        </li>
        <li>
          <a href='/about'>Who We Are</a>
        </li>
        {
          currentUser ? (
            <li>
              <a href={`/profile/${currentUser._id}`}>{`${currentUser.name}`}</a>
            </li>
          ) : null
        }
      </ul>
    </nav>
  )
}
