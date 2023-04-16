import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

import PostCard from './PostCard';

const Timeline = ({ submitted, setSubmitted}) => {

  const { currentUser } = useSelector((state) => state.user);
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(`/posts/timeline/${currentUser._id}`);
        setTimelinePosts(posts.data);
        setSubmitted(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, submitted]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/users');
      const usersObj = {};

      users.data.forEach(user => {
        usersObj[user._id] = user;
      });

      setUsers(usersObj);

    }

    fetchUsers();
  }, []);

  return (
    <div>
      <div id='profile-posts' className='posts'>
        {timelinePosts.map((post, id) => <PostCard post={post} key={id} user={users[post.userId]}/>)}
      </div>
    </div>
  )
}

export default Timeline