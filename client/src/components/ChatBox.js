import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  //fetching for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/users/find/${userId}`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);


  //fetching for nessages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/message/${chat._id}`);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId })
    // send message to database
    try {
      const { data } = await axios.post(`/message`, message);
      setMessages([...messages, data]);
      setNewMessage("");
    }
    catch
    {
      console.log("error")
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }

  }, [receivedMessage])



  const scroll = useRef();
  const imageRef = useRef();

  return (
    <>
      <div className='chat-area'>
        <>
          {userData && (
            <>
              <div className='user-card-chat chat-header'>
                <div className='online-dot'></div>
                <a href={`/profile/${userData._id}`}><img src={userData?.photo ? userData.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='chat' /></a>
                <div className='chat-username'>
                  <h2>{userData?.name} {userData?.surname}</h2>
                  <p>Online</p>
                </div>
              </div>
              <div className='chat-body'>
                {messages && (
                  messages.map((message, id) =>
                    <div className={message.senderId === currentUser._id ? "sentMessage" : "takenMessage"} key={id}>
                      <p>{message.text}</p>
                      <p>{(message.createdAt)}</p>
                    </div>
                  )
                )}
              </div>
              <div className='chat-sender'>
                <div>+</div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <button onClick={handleSend}>send</button>
              </div>
            </>
          )}
        </>
        <div className='chat-area-text'>
          {!userData && (
            <p>Click any user to start conversation.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatBox