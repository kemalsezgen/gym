import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = ({ setSubmitted }) => {
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
    try {
      const submitPost = await axios.post("/posts", post);
      toggleModal();
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Create
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content cratePostForm">
            <form onSubmit={handleSubmit}>
              <div className='formInput'>
                <input type="text"
                  id="postTitle"
                  name="title"
                  value={post.title}
                  placeholder='Title' onChange={handleInputChange} />
              </div>
              <div className='formInput'>
              <textarea type="text"
                id="postBody"
                name="body"
                value={post.body}
                placeholder='Text here your content.' onChange={handleInputChange} />
              </div>
              <button id="createPostFormButton" type='submit'>
                Create
              </button>
              <button id="cancelCreatePostFormButton" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost