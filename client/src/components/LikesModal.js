import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { following } from "../redux/userSlice"
import axios from 'axios';

const LikesModal = ({ user, currentUser, post }) => {
  const [modal, setModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/users');
      setLikedUsers(users.data.filter(user => post.likes.includes(user._id)));
    }
    fetchUsers();
  }, [user, post]);

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
      <div className='subscribersText likedUserText' onClick={toggleModal}>
        <p>
          {`${post.likes.length} `}
          <span className="like-count">
            {post.likes.length > 1 ? "users" : "user"}
          </span>
          {` liked it.`}
        </p>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className='modal-content'>
            <div className='username-list'>
              <ul>
                {likedUsers.map((likedUser, id) => (
                  <li key={id}>
                    <p><a href={`/profile/${likedUser._id}`}>{likedUser.username}</a></p>
                    <p id='follow-following-followBack' onClick={() => handleFollow(likedUser._id)}>{(currentUser._id === likedUser._id) ? "-" : currentUser.following.includes(likedUser._id) ? "unfollow" :
                      (currentUser.followers.includes(likedUser._id) ? "follow back" : "follow")}</p>
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

export default LikesModal;