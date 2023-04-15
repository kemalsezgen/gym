import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

import PostCard from './PostCard';

const Timeline = ({ submitted, setSubmitted}) => {

  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [timelinePosts, setTimelinePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(`/posts/timeline/${currentUser._id}`);
        setTimelinePosts(posts.data);
        setSubmitted(false);
        console.log(posts.data)
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, submitted]);

  return (
    <div>
      <div id='profile-posts' className='posts'>
        {timelinePosts.map((post, id) => <PostCard post={post} key={id} />)}
      </div>
    </div>
  )
}

export default Timeline