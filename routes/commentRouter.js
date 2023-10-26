const express = require('express')
const {
  getCommentsByArticleRef,
  updateCommentByRef,
  addCommentByRef,
  deleteCommentById,
} = require('../controllers/commentController')

// Initialize routing to endpoints here
const commentRouter = express.Router()

// Get comments for specific article in article page using article id in :id
commentRouter.get('/comments/:id', getCommentsByArticleRef)

// Add comment for specific article
// router.post('/comments', addComment)
commentRouter.post('/comments', addCommentByRef)

// Update comment likes by incrementing using firebase admin
// .delete(...) currently used; need to implement a blog admin center
commentRouter
  .route('/comments/:id/:commentId')
  .put(updateCommentByRef)
  .delete(deleteCommentById)

module.exports = commentRouter
