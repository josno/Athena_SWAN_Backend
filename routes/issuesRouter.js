const express = require('express')
const {
  addIssue,
  deleteIssueById,
  getIssues,
} = require('../controllers/issueController')

// Initialize routing to endpoints here
const issuesRouter = express.Router()

// .get(...) not currently used; needed for article admin center
issuesRouter.route('/issues').get(getIssues).post(addIssue)

// Endpoint not currently used; needed for article admin center
issuesRouter.route('/issues/:id').delete(deleteIssueById)

module.exports = issuesRouter
