import React, {useState} from "react";
import { useSelector } from "react-redux";

import Login from './Login.js';
import CreatePost from "../components/CreatePost.js";
import Timeline from "../components/Timeline.js";

const Home = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {!currentUser ? (
        <Login />
      ) : (
        <div className="homepage-container">
          <CreatePost setSubmitted={setSubmitted}/>
          <Timeline submitted={submitted} setSubmitted={setSubmitted}/>
        </div>
      )}
    </>
  );
};

export default Home;