import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { logout, editProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");

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

  return (
    <div className="edit-form">
      <input type="text" value={description} onChange={handleInputChange} />
      <button className="" onClick={handleUpdate}>güncelle</button>
      <p>Delete Account</p>
      <button className="" onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default EditProfile;