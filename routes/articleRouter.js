const express = require('express')
const {
  getArticles,
  getArticleById,
  updateArticleById,
  addArticle,
  deleteArticleById,
} = require('../controllers/articleController')

// Initialize routing to endpoints here
const articleRouter = express.Router()

// Router with endpoint to '/articles' to get all articles for article list page
// .post(...) is not currently used, need to implement a blog submission page
articleRouter.route('/articles').get(getArticles).post(addArticle)

// Router to get article by specific article id - for article page
// We should be passing in the articleId in the parameters because
// that is the identifier in Firebase; Firestore will return only one document
// .delete(...) currently used; need to implement a blog admin center

articleRouter
  .route('/article/:id')
  .get(getArticleById)
  .put(updateArticleById)
  .delete(deleteArticleById)

module.exports = articleRouter
