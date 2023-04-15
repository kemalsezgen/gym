import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios';

const PostCard = ({ post }) => {

  const [postOwner, setPostOwner] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postOwner = await axios.get(`/users/find/${post.userId}`);
        setPostOwner(postOwner.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [postOwner])

  return (
    <div className='post-card'>
        <div className='post-content'>
          <p className='post-time'>{moment(new Date(post.createdAt)).fromNow()}</p>
          {postOwner && <p><a href={`/profile/${postOwner._id}`}>{postOwner.username}</a></p>}
          <h2><a href={`/post/${post._id}`}>{post.title}</a></h2>
          <p>{post.body.length > 280 ? post.body.substring(0, 280) + "..." : post.body}</p>
        </div>
        <div className='post-image'>
          <img src={post.image ? post.image : 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'} alt='post' />
        </div>
    </div>
  )
}

export default PostCard