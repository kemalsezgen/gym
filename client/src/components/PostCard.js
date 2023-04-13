import React from 'react'

const PostCard = ({ post }) => {
  return (
    <div className='post-card'>
        <div className='post-content'>
          <p className='post-time'>{post.createdAt}</p>
          <h2><a href={`/post/${post._id}`}>{post.title}</a></h2>
          <p>{post.body.length > 200 ? post.body.substring(0, 200) + "..." : post.body}</p>
        </div>
        <div className='post-image'>
          <img src={post.image ? post.image : 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'} alt='post' />
        </div>
    </div>
  )
}

export default PostCard