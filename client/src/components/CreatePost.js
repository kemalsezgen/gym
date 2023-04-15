import React, { useState } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = ({ setSubmitted }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState({
    userId: currentUser._id,
    title: "",
    body: "",
    image: "",
  })

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
      console.log(submitPost)
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
        <button id="createPostFormButton" type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost