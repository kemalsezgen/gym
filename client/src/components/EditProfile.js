import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { logout, editProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setUpdated }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [description, setDescription] = useState(currentUser.description);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
    console.log("profile deleted", deleteProfile)
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdate = async () => {
    const updatedProfile = await axios.put(`/users/${currentUser._id}`, {
      ...currentUser,
      description
    });
    dispatch(editProfile(updatedProfile.data.description));
    console.log(updatedProfile.data)
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await axios.put(`/users/${currentUser._id}`, {
        ...currentUser,
        description
      });
      dispatch(editProfile(updatedProfile.data.description));
      console.log(updatedProfile.data)
      toggleModal();
      setUpdated(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Edit Profile
      </button>

      {modal && (
        <div className="editProfile-modal modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <p>Edit your profile description:</p>
              <textarea className="longInput" cols="30" rows="10" value={description} onChange={handleInputChange} />
              <button id="updateAccountButton" onClick={handleUpdate} type='submit'>Update</button>
            </form>
            <p>Do you want to delete your account?</p>
            <button id="deleteAccountButton" onClick={handleDelete}>Delete Account</button>
          </div>
        </div>)
      }
    </>
  );
};

export default EditProfile;