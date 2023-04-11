import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { toCamelCase } from '../utils/camelCase';
import PostCard from '../components/PostCard'
import EditProfile from "../components/EditProfile";
import { following } from "../redux/userSlice"

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState();
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(`http://localhost:5000/posts/user/all/${currentUser._id}`);
        const userProfile = await axios.get(`/users/find/${id}`);
        setPosts(posts.data);
        setUserProfile(userProfile.data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
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
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <>
      <div className='profile-container'>
        <div className='profile-header'>
          <img src={userProfile.photo ? userProfile.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='trainer' />
          <h2>{toCamelCase(userProfile.name) + " " + toCamelCase(userProfile.surname)}</h2>
          <div className='subscribe-container'>
            <p>{`${userProfile.followers.length} abone - ${userProfile.following.length} takip`}</p>
          </div>
          <div>
              {currentUser._id === id ? (
                <button className="edit-button" onClick={() => setOpen(true)}>
                  Edit Profile
                </button>
              ) : currentUser.following.includes(id) ? (
                <button className="follow-button" onClick={handleFollow}>
                  Unfollow
                </button>
              ) : (
                <button className="follow-button" onClick={handleFollow}>
                  Follow
                </button>
              )}
            </div>
        </div>
        <div className='profile-body'>
          <div className='profile-description'>
            <p>{userProfile.description ? userProfile.description : "deneme açıklama"}</p>
          </div>
          <div className='profile-posts'>
            {posts.map((post, id) => <PostCard post={post} key={id} />)}
          </div>
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
    )
  }
}

export default Profile