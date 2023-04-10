import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

import { toCamelCase } from '../utils/camelCase';
import PostCard from '../components/PostCard'

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(`http://localhost:5000/posts/user/all/${currentUser._id}`);
        setPosts(posts.data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div className='profile-container'>
        <div className='profile-header'>
          <img src={currentUser.photo ? currentUser.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='trainer' />
          <h2>{toCamelCase(currentUser.name) + " " + toCamelCase(currentUser.surname)}</h2>
        </div>
        <div className='profile-body'>
          <div className='profile-description'>
            <p>{currentUser.description ? currentUser.description : "deneme açıklama"}</p>
          </div>
          <div className='profile-posts'>
            {posts.map((post, id) => <PostCard post={post} key={id} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile