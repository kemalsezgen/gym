import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = conversation.members.find((id)=>id!==currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users/find/" + userId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img src={user?.photo ? user.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='chat' />
      <h2>{user && user.name} {user.username}</h2>
      <p className="conversationName">{user && user.username}</p>
    </div>
  );
}