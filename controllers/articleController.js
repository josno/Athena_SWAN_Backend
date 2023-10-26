const firebase = require('../db')
const Article = require('../models/article')
const firestore = firebase.firestore()

// These are controller function that define how to get and submit data to Firestore
// They will be called in the route pages where the endpoints live
// Each one has a condition for what happens to the data when something
// is successful and when something fails

const getArticles = async (req, res, next) => {
  try {
    // Async function that returns a promise
    const articles = await firestore.collection('articles')

    // We wait until it resolves and get the data and store it in data variable
    const data = await articles.get()

    // We build an array which will be returned inside response
    const articleArray = []
    if (data.empty) {
      // If nothing in data return this
      res.status(404).send('No articles found')
    } else {
      // Take each data item and iterate over it so we can build an article object to
      data.forEach((a) => {
        const article = new Article(
          a.id,
          a.data().name,
          a.data().title,
          a.data().writtenBy,
          a.data().createdDate,
          a.data().categories,
          a.data().content,
          a.data().photoUrl,
          a.data().likes
        )
        articleArray.push(article)
      })

      // .send automatically sends a status of 200 and a json object
      // articleArray will be all articles as an object
      res.send(articleArray)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addArticle = async (req, res, next) => {
  try {
    const { likes, content, name, categories, title, photoUrl, writtenBy } =
      req.body

    const insertData = {
      likes,
      content,
      name,
      categories,
      title,
      photoUrl,
      writtenBy,
      createdDate: new Date(),
    }

    const docRef = await firestore.collection('articles').doc()
    await docRef.set(insertData)

    // We call the get comments here by sending in a new list comments with updated information
    const response = await getArticles(req, res, next)
    // Returns the response from getCommentsByArticleRef controller
    return response
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getArticleById = async (req, res, next) => {
  const { id } = req.params

  try {
    // Use id from sent in request parameters to query the collection in Firebase
    // Firestore will find only one document and return it

    // Promise and information on collection
    const article = await firestore.collection('articles').doc(`${id}`)

    // Resolve and get specific doc
    const data = await article.get()

    if (data.empty) {
      // If nothing in data return this
      res.status(404).send('No article found')
    } else {
      // data() function returns document object
      res.send(data.data())
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateArticleById = async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  try {
    // Use id from sent in request parameters to query the collection in Firebase
    // Firestore will find only one document and return it

    // Promise and information on collection
    const article = await firestore.collection('articles').doc(`${id}`)

    // Resolve and get specific doc
    await article.update(data)

    const response = await getArticleById(req, res, next)
    // Returns the response from getCommentsByArticleRef controller
    return response
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// Extra controller
const deleteArticleById = async (req, res, next) => {
  try {
    const { id } = req.params

    const docRef = await firestore.collection('articles').doc(id).delete()

    // We call the get comments here by sending in a new list comments with updated information
    res.status(200).send({ msg: 'Article deleted' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getArticles,
  getArticleById,
  updateArticleById,
  addArticle,
  deleteArticleById,
}
