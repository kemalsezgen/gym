import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { following } from "../redux/userSlice"
import axios from 'axios';


const SubscribersModal = ({ user, currentUser }) => {
  const [modal, setModal] = useState(false);
  const [subscribers, setSubscribers] = useState();
  const subscribersIds = user.followers;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/users');
      setSubscribers(users.data.filter(user => subscribersIds.includes(user._id)));
    }
    fetchUsers();
  }, [user]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleFollow = async (id) => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(`/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(`/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  return (
    <>
      <div className='subscribersText' onClick={toggleModal}>
        <p>{`${user.followers.length}`}</p>
        <p>subscribers</p>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className='modal-content'>
            <div className='username-list'>
              <ul>
                {subscribers.map((subscriber, id) => (
                  <li key={id}>
                    <p><a href={`/profile/${subscriber._id}`}>{subscriber.username}</a></p>
                    <p id='follow-following-followBack' onClick={() => handleFollow(subscriber._id)}>{(currentUser._id === subscriber._id) ? "-" : currentUser.following.includes(subscriber._id) ? "unfollow" : 
                    (currentUser.followers.includes(subscriber._id) ? "follow back" : "follow")}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubscribersModal;