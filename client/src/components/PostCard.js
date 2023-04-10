import React from 'react'

const PostCard = ({post}) => {
  return (
    <div className='post-card'>
      <div className='post-image'>
        <img src={post.image ? post.image : 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80'} alt='trainer' />
      </div>
      <div className='cardText'>
        <h3>{post.title}</h3>
        <hr />
        <p>{post.body}</p>
        <hr />
        <p>{post.likes.length} likes</p>
      </div>
    </div>
  )
}

export default PostCard