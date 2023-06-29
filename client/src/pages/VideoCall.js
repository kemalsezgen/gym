import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Typography, AppBar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "../components/VideoCall/VideoPlayer";
import Sidebar from "../components/VideoCall/Sidebar";
import Notifications from "../components/VideoCall/Notifications";

import axios from "axios";

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

const VideoCall = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const classes = useStyles();

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
    <div className="chat-container">
      <div className="chat-grid-area">
        {/* Conversations LEFT SIDE */}
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
        {/* Conversations RIGHT SIDE */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className={classes.wrapper}>
                  <AppBar
                    className={classes.appBar}
                    position="static"
                    color="inherit"
                  >
                    <Paper>Video Call</Paper>
                  </AppBar>
                  <VideoPlayer />
                  <Sidebar>
                    <Notifications />
                  </Sidebar>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
