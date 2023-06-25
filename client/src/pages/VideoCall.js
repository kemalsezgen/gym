import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const VideoCall = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [currentChat, setCurrentChat] = useState();

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
              <div className="videoCall-userCard" key={follower.id} onClick={() => setCurrentChat(follower)}>
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
                <div className="chatBoxUsername">
                  <h2>{currentChat.username}</h2>
                </div>
                <div className="chatBoxTop">
                  <button className="callButton">CALL</button>
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
