const pool = require("./db");

async function signupUser(username, password, email) {
  try {
    const result = await pool.query(
      "INSERT INTO users(username,password,email) VALUES($1, $2, $3)",
      [username, password, email]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllPosts() {
  try {
    const result = await pool.query(
      `SELECT users.username, posts.text, posts.created_at 
       FROM posts 
       JOIN users ON users.id = posts.user_id 
       ORDER BY posts.created_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPostById(post_id) {
  try {
    const result = await pool.query(
      `SELECT posts.post_id, users.username, posts.text, posts.created_at 
       FROM posts 
       JOIN users ON users.id = posts.user_id 
       WHERE post_id = $1
       ORDER BY posts.created_at DESC`,
      [post_id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPostToAlterById(post_id) {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE post_id = $1`, [
      post_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function editPost(text, post_id) {
  try {
    const result = await pool.query(
      "UPDATE posts SET text = $1 WHERE post_id = $2",
      [text, post_id]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllPostsByUser(user_id) {
  try {
    const result = await pool.query(
      `SELECT posts.post_id, users.username, posts.text, posts.created_at 
       FROM posts 
       JOIN users ON users.id = posts.user_id 
       WHERE posts.user_id = $1
       ORDER BY posts.created_at DESC`,
      [user_id]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addPost(user_id, text) {
  try {
    const result = await pool.query(
      "INSERT INTO posts (user_id,text) VALUES ($1,$2)",
      [user_id, text]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deletePost(post_id) {
  try {
    const result = await pool.query("DELETE FROM posts WHERE post_id = $1", [
      post_id,
    ]);
    return result.rowCount; // returns the number of rows affected
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

module.exports = {
  signupUser,
  getAllPosts,
  addPost,
  getAllPostsByUser,
  getPostById,
  getPostToAlterById,
  editPost,
  deletePost,
};
