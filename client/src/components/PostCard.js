import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios';
import { useSelector } from 'react-redux';

import { AiFillDelete } from 'react-icons/ai';

const PostCard = ({ post, setSubmitted, user}) => {

  const { currentUser } = useSelector((state) => state.user);
  
  const handleDelete = async () => {
    console.log("delete")
    const deleted = await axios.delete(`/posts/${post._id}`, {
      id: currentUser._id
    });
    setSubmitted(true);
  }

  return (
    (user &&
      <div className='post-card'>
        <div className='post-content'>
          <p>{moment(new Date(post.createdAt)).fromNow()}</p>
          {(currentUser._id === user._id) &&
            <button className="deletePostButton" onClick={handleDelete}>
              <AiFillDelete />
            </button>}
          <p><a href={`/profile/${user._id}`}>{user.username}</a></p>
          <h2><a href={`/post/${post._id}`}>{post.title}</a></h2>
          <p>{post.body.length > 280 ? post.body.substring(0, 280) + "..." : post.body}</p>
          <div id="viewPost">
            <a href={`/post/${post._id}`}>{'>>>'}</a>
          </div>
        </div>
        <div className='post-image'>
          <img src={post.image ? post.image : 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'} alt='post' />
        </div>
      </div>)
  )
}

export default PostCard