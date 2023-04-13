import React from 'react'

const TrainerCard = ({ trainer }) => {
  return (
    <div className='trainerCard'>
        <div className='trainerPhoto'>
            <img src={trainer.photo ? trainer.photo : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} 
            alt='trainer' />
        </div>
        <div className='trainer-cardText'>
            <p><a href={`/profile/${trainer._id}`}>{trainer.name}</a></p>
            <hr/>
            <p>{trainer.description}</p>
        </div>
    </div>
  )
}

export default TrainerCard