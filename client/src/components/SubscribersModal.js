import React, { useState, useEffect } from 'react'

import { useSelector } from "react-redux";
import axios from 'axios';


const SubscribersModal = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [subscribers, setSubscribers] = useState();

  const subscribersIds = user.followers;

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/users');
      setSubscribers(users.data.filter(user => subscribersIds.includes(user._id)));
    }
    fetchUsers();
  }, [user]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        {`${user.followers.length} subscribers`}
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
            <div className='modal-content'>
              <ul>
                {subscribers.map((subscriber, id) => (
                  <li key={id}>
                    <a href={`/profile/${subscriber._id}`}>{subscriber.username}</a>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      )}
    </>
  );
}

export default SubscribersModal;