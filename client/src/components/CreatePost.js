import React, { useState } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { addPost } from "../redux/postSlice";

const CreatePost = ({ setSubmitted }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [post, setPost] = useState({
    userId: currentUser._id,
    title: "",
    body: "",
    image: "",
  })

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitPost = await axios.post("/posts", post);
      dispatch(addPost(submitPost.data))
      setSubmitted(true);
      setPost({})
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="cratePostForm">
      <form onSubmit={handleSubmit}>
        <div className='formInput-homepage'>
          <input type="text"
            name="title"
            value={post.title}
            placeholder='Title' onChange={handleInputChange} />
        </div>
        <div className='formInput-homepage'>
          <textarea type="text"
            name="body"
            value={post.body}
            placeholder='Text here your content.' onChange={handleInputChange} />
        </div>
        <button className="createPostFormButton" type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost