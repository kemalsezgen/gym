import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';

const Home = () => {
  
  const token = Cookies.get(['accessToken']);
  
  return (
    <div>
      <h1>Welcome!</h1>
      <p>{token}</p>
    </div>
  );
};

export default Home;
