import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Login from './Login.js';
import Conversation from "../components/Conversation/Conversation.js";
import Message from "../components/Message/Message.js";
import ChatBox from "../components/ChatBox.js";
import { io } from 'socket.io-client';

const Chat = () => {

  const { currentUser } = useSelector((state) => state.user);
  const scrollRef = useRef();
  const socket = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/chat/" + currentUser._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-container">
        <div className="chat-grid-area">
          {/* Conversations LEFT SIDE */}
          <div className="left-side-chat">
              {conversations.map((c, id) => (
                <div className='user-card-chat' key={id} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={currentUser} />
                </div>
              ))}
          </div>
          {/* Chats RIGHT SIDE */}
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxUsername">
                    <h2>username</h2>
                  </div>
                  <div className="chatBoxTop">
                    {messages.map((m, id) => (
                      <div ref={scrollRef} key={id}>
                        <Message message={m} own={m.sender === currentUser._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
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
    </>
  );
};

export default Chat