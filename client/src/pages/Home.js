import React from "react";
import Login from './Login.js';
import Sidebar from "../components/Sidebar";

import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <>
      {!currentUser ? (
        <Login />
      ) : (
        <div>
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default Home;