import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const [post, setPost] = useState({
    userId: currentUser._id,
    title: "",
    body: "",
    image: "",
  })

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sa")
    
    e.preventDefault();
    try {
      const submitTweet = await axios.post("/posts", post);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Create Post
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <input type="text"
                name="title"
                value={post.title}
                placeholder='Title' onChange={handleInputChange} />
              <input type="text"
                name="body"
                value={post.body}
                placeholder='Text here your content.' onChange={handleInputChange} />
              <button className="create-post" type='submit'>
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost