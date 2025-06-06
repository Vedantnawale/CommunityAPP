const express = require('express');
const postRouter = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const { createPost, getAllPosts, getPostById, toggleLike, addComment, deleteComment, deletePostByAdmin } = require('../controller/postController');

postRouter.post('/', jwtAuth, createPost);
postRouter.get('/posts', jwtAuth, getAllPosts);
postRouter.get('/:id', jwtAuth, getPostById);
postRouter.post('/like/:id', jwtAuth, toggleLike);
postRouter.delete("/admin/delete-post/:userId/:postId", jwtAuth, deletePostByAdmin);
postRouter.post('/comment/:id', jwtAuth, addComment);
postRouter.delete('/comment/:postId/:commentId', jwtAuth, deleteComment);



module.exports = postRouter;