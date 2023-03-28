import React from 'react'

export default function Navbar() {

  return (
    <nav className='nav'>
      <a href="/" className="site-title">
        BEST GYM
      </a>
      <ul>
        <li>
          <a href='/trainers'>Trainers</a>
        </li>
      </ul>
    </nav>
  )
}
