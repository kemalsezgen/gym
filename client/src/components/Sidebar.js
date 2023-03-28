import React from "react";
import { Link } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { AiFillHome } from 'react-icons/ai'

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
            <AiFillHome fontSize="large" />
            <p>Trainers</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser.otherData._id}`}>
          <div>
            <AiFillHome fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{currentUser.username}</p>
          <p className="font-bold">@{currentUser.username}</p>
        </div>
        <div>
          <Link to="login">
            <button
              className="bg-red-500 px-4 py-2 text-white rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;