import React, { useEffect, useState, useContext} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from '../Context'

import VideoPlayer from "../components/VideoCall/VideoPlayer";
import Sidebar from "../components/VideoCall/Sidebar";
import Notifications from "../components/VideoCall/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const { me } = useContext(SocketContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFollowers = await axios.get(
          "/users/followers/" + currentUser._id
        );
        setFollowers(userFollowers.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <>
      <div className="left-side-chat">
        {followers.map((follower) => {
          return (
            <div
              className="videoCall-userCard"
              key={follower.id}
              onClick={() => setCurrentChat(follower)}
            >
              {follower.username}
            </div>
          );
        })}
      </div>
      <div className={classes.wrapper}>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </>
  );
};

export default App;
