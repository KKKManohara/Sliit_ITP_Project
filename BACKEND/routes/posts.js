const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Save posts
router.post('/post/save', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(200).json({
      success: "Post saved successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

// Get posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('image').exec();
    return res.status(200).json({
      success: true,
      existingPosts: posts
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

// Get a specific post
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).exec();

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      post
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Update a specific post
router.put('/post/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedFields = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updatedFields },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Delete posts
router.delete('/post/delete/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id).exec();
    return res.json({
      message: "Delete successful",
      deletedPost
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message
    });
  }
});

module.exports = router;
