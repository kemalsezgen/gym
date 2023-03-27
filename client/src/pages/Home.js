import React from "react";
import Login from './Login.js';

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
          Welcome {`${currentUser.otherData.username}`}
        </div>
      )}
    </>
  );
};

export default Home;