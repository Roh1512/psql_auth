const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../config/queries");

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await queries.getAllPosts();
  res.render("allPosts", { posts });
});

exports.getPostById = asyncHandler(async (req, res) => {
  const post_id = parseInt(req.params.postid);
  const post = await queries.getPostById(post_id);
  console.log(post);
  res.render("post", { post });
});

exports.editPostGet = asyncHandler(async (req, res) => {
  const post_id = parseInt(req.params.postid);
  const post = await queries.getPostToAlterById(post_id);
  console.log(post);
  res.render("editPost", { post });
});

exports.editPostPost = asyncHandler(async (req, res) => {
  const post_id = parseInt(req.params.postid);
  const text = req.body.text;
  const editPost = await queries.editPost(text, post_id);
  console.log(editPost);
  res.redirect(`/posts/${post_id}`);
});

exports.addNewPost = asyncHandler(async (req, res) => {
  const text = req.body.text;
  const user_id = parseInt(req.user?.id);
  if (text && user_id) {
    try {
      const result = await queries.addPost(user_id, text);
      console.log(result);
      res.redirect("/posts");
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    res.send("Text and user_id does not exists");
  }
});

exports.getAllPostsByUser = asyncHandler(async (req, res) => {
  const user_id = parseInt(req.user.id);
  if (user_id) {
    try {
      const posts = await queries.getAllPostsByUser(user_id);
      console.log(`Posts by user ${user_id}: `, posts);
      res.render("allPostsByUser", { posts, user: req.user });
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    res.send("userid does not exists");
  }
});

exports.deletePostGet = asyncHandler(async (req, res) => {
  const post_id = parseInt(req.params.postid);
  const post = await queries.getPostToAlterById(post_id);
  if (parseInt(post.user_id) === parseInt(req.user.id)) {
    return res.render("deleteForm", { post });
  } else {
    return res.render("deleteFailed");
  }
});

exports.deletePostPost = asyncHandler(async (req, res) => {
  const post_id = parseInt(req.body.post_id);
  const deletePost = queries.deletePost(post_id);
  console.log(deletePost);
  res.redirect("/posts/profile");
});
