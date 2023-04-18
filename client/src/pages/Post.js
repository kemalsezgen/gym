import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import LikesModal from '../components/LikesModal';

import { AiOutlineLike, AiFillLike } from 'react-icons/ai';


const Post = () => {
  const [post, setPost] = useState();
  const [postOwner, setPostOwner] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [likeChange, setLikeChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPost = await axios.get(`/posts/${id}`)
        setPost(currentPost.data)

        const user = await axios.get(`/users/find/${currentPost.data.userId}`)
        setPostOwner(user.data);

        setLikeChange(!likeChange)
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [id, likeChange]);

  const handleLike = async (e) => {
    e.preventDefault();
    const like = await axios.put(`/posts/${post._id}/like`, {
      id: currentUser._id,
    });
  };

  return (
    <>
      <div className='postPage-container'>
        {post && (
          <>
            <div className='postPage-header'>
              {postOwner ? <h2><a href={`/profile/${postOwner._id}`}>{postOwner.username}</a></h2> : "-"}
              <p>{post && moment(new Date(post.createdAt)).fromNow()}</p>
            </div>
            <div className='postPage-photo'>
              <img src={post && post.image ? post.image : "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"} alt="post"></img>
            </div>
            <div className='postPage-content'>
              <h1>{post && post.title}</h1>
              <p>{post && post.body}</p>
              <div className='likePost'>
                <p onClick={handleLike}>
                  {post.likes.includes(currentUser._id) ? <AiFillLike /> : <AiOutlineLike />}
                </p>
                <LikesModal currentUser={currentUser} post={post}/>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='empty'>
        <p>..</p>
      </div>
    </>
  )
}

export default Post