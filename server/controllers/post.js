import Post from "../models/Post.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    handleError(500, err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("post has been deleted");
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.id)) {
      await post.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("post has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("post has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const followersPosts = await Promise.all(
      currentUser.following.map((followerId) => {
        return Post.find({ userId: followerId });
      })
    );

    const allPosts = userPosts.concat(...followersPosts).sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(allPosts);
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const userPosts = await Post.find({ userId: req.params.id });
    const sortedUserPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(sortedUserPosts);
  } catch (err) {
    handleError(500, err);
  }
};

export const getExplorePosts = async (req, res, next) => {
  try {
    const getExplorePosts = await Post.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExplorePosts);
  } catch (err) {
    handleError(500, err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (err) {
    handleError(500, err);
  }
};
