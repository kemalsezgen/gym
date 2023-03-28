import React from "react";
import { Link } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { AiFillHome } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg';
import { AiOutlineUser } from 'react-icons/ai'

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div>
        <Link to="/">
          <div>
            <AiFillHome fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/trainers">
          <div>
            <CgGym fontSize="large" />
            <p>Trainers</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <div>
            <AiOutlineUser fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <p>welcome {currentUser.username}</p>
        </div>
        <div>
          <Link to="login">
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;