import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import PostCard from '../components/PostCard'
import EditProfile from "../components/EditProfile";
import CreatePostModal from '../components/CreatePostModal';
import SubscribersModal from '../components/SubscribersModal';
import { following } from "../redux/userSlice"

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [isLoading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState();
  const [userProfile, setUserProfile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${id}`)
        setUserProfile(userProfile.data)

        const posts = await axios.get(`http://localhost:5000/posts/user/all/${userProfile.data._id}`)
        setUserPosts(posts.data)

        setLoading(false);
        setSubmitted(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id, submitted, updated]);

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
          <main className='grid-container'>
            <div className='profile-top'>
              <div id='profile-photo-new' className='profilePhoto'>
                <img src={userProfile.photo ? userProfile.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'}
                  alt='profilephoto' />
                <div className='subscribers-button'>
                  <SubscribersModal user={userProfile} />
                  <p>{`${userProfile.following.length} takip`}</p>
                  <p>{`${userPosts.length} posts`}</p>
                  <div>
                    {currentUser._id === id ? (
                      <div>
                        <EditProfile setUpdated={setUpdated}/>
                        <CreatePostModal setSubmitted={setSubmitted}/>
                      </div>
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
              </div>
              <div id='profile-description-new' className='descriptions'>
                <h2>{userProfile.name + " " + userProfile.surname}</h2>
                <p>{userProfile.description ? userProfile.description : "deneme açıklama"}</p>
              </div>
            </div>
            <div id='profile-posts' className='posts'>
              {userPosts.map((post, id) => <PostCard post={post} key={id} user={currentUser} setSubmitted={setSubmitted}/>)}
            </div>
          </main>
        </div>
        <div className='empty'>
          <p>.</p>
        </div>
      </>
    )
  }

}

export default Profile