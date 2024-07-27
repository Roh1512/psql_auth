var express = require("express");

const postsController = require("../controllers/postsController");
const asyncHandler = require("express-async-handler");
const verifyAuth = require("../middlewares/verifyAuth");

var router = express.Router();

router.get("/", verifyAuth, postsController.getAllPosts);

router.get("/profile", verifyAuth, postsController.getAllPostsByUser);

router.post("/add", verifyAuth, postsController.addNewPost);

router.get("/:postid/edit", verifyAuth, postsController.editPostGet);
router.post("/:postid/edit", verifyAuth, postsController.editPostPost);

router.get("/:postid/delete", verifyAuth, postsController.deletePostGet);
router.post("/:postid/delete", verifyAuth, postsController.deletePostPost);

router.get("/:postid", verifyAuth, postsController.getPostById);

module.exports = router;
