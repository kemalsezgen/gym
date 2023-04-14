import React, { useEffect, useState } from 'react'
import axios from 'axios';

import TrainerCard from '../components/TrainerCard'

const Trainers = () => {

  const [isLoading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("http://localhost:5000/users");
        const trainers = users.data.filter(user => user.type === "pt");
        setTrainers(trainers);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <>
      <div className='trainers-container'>
        <h1>Trainers</h1>
        <div className='trainers'>
          {trainers.map((trainer, id) => <TrainerCard key={id} trainer={trainer} />)}
        </div>
      </div>
      <div>

      </div>
      </>
    )
  }
}

export default Trainers