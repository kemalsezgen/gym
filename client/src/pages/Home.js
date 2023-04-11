import React from "react";
import { useSelector } from "react-redux";

import Login from './Login.js';
import { toCamelCase } from "../utils/camelCase.js";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <>
      {!currentUser ? (
        <Login />
      ) : (
        <div>
          {`Hey ${toCamelCase(currentUser.name)}, welcome to GYM.`}
        </div>
      )}
    </>
  );
};

export default Home;