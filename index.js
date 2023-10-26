const express = require('express')
const cors = require('cors')
const config = require('./config')
const articleRouter = require('./routes/articleRouter')
const commentRouter = require('./routes/commentRouter')
const issuesRouter = require('./routes/issuesRouter')

// Initialize main application
// This is the main server section

const app = express()

// BodyParser is now deprecated so we use this built-in method instead
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Accept all types of HTTP requests
app.use(cors())

// Test to make sure server is running
app.get('/', (req, res, next) => res.send('Athena server'))

// We will import routers here for modularity
// These are the specific endpoints that the app will listen on
app.use('/api/v1', articleRouter)
app.use('/api/v1', commentRouter)
app.use('/api/v1', issuesRouter)

app.listen(config.port, () => {
  console.log('App is listening on https://localhost:' + config.port)
})
