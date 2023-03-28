import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      Welcome {`${currentUser.username}`}
    </div>
  )
}

export default Profile