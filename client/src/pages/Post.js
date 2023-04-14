import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Post = () => {

  const [post, setPost] = useState();
  const [postOwner, setPostOwner] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPost = await axios.get(`/posts/${id}`)
        setPost(currentPost.data)
        const user = await axios.get(`/users/find/${currentPost.data.userId}`)
        setPostOwner(user.data);

      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='postPage-container'>
      {postOwner ? <h2>{postOwner.name}</h2> : "-"}
      <p>{post && post.createdAt}</p>
      <div className='postPage-photo'>
        <img src={post && post.image ? post.image : "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"} alt="post"></img>
      </div>
      <div className='postPage-content'>
        <h1>{post && post.title}</h1>
        <p>{post && post.body}</p>
      </div>
    </div>
  )
}

export default Post