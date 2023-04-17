import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { following } from "../redux/userSlice"
import axios from 'axios';

const FollowingModal = ({ user, currentUser }) => {
  const [modal, setModal] = useState(false);
  const [followings, setFollowings] = useState();
  const followingIds = user.following;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/users');
      setFollowings(users.data.filter(user => followingIds.includes(user._id)));
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
        <p>{`${user.following.length}`}</p>
        <p>following</p>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className='modal-content'>
            <div className='username-list'>
              <ul>
                {followings.map((following, id) => (
                  <li key={id}>
                    <p><a href={`/profile/${following._id}`}>{following.username}</a></p>
                    <p id='follow-following-followBack' onClick={() => handleFollow(following._id)}>{(currentUser._id === following._id) ? "-" : currentUser.following.includes(following._id) ? "unfollow" : 
                    (currentUser.followers.includes(following._id) ? "follow back" : "follow")}</p>
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

export default FollowingModal;