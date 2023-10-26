const firebase = require('../db')
const Comment = require('../models/comment')
const firestore = firebase.firestore()

const getCommentsByArticleRef = async (req, res, next) => {
  const { id } = req.params
  try {
    // Since we are using a reference (to its parents article) to get the comments we
    // create a reference document using the id in the params
    const commentDocRef = await firestore.collection('articles').doc(`${id}`)

    // We match the reference document to the refArticle here
    // All comments with the refArticle of the same article will be returned
    // Query is saying "return all comments that has a refArticle field of the reference document"
    const data = await firebase
      .firestore()
      .collection('comments')
      .where('refArticle', '==', commentDocRef)
      .get()

    const commentArray = []

    if (data.empty) {
      // If nothing in data return this
      res.status(404).send([])
    } else {
      // Make an object for each comment and put inside a list
      data.forEach((c) => {
        const comment = new Comment(
          c.id,
          c.data().comment,
          c.data().name,
          c.data().createdDate,
          c.data().dislikes,
          c.data().likes
        )

        commentArray.push(comment)
      })
      // Send the formatted commentArray
      res.send(commentArray)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateCommentByRef = async (req, res, next) => {
  try {
    const { commentId, id } = req.params
    const data = req.body
    data.refArticle = firestore.doc('articles/' + id)

    // We directly update comments here with comment Id
    const comment = await firestore.collection('comments').doc(commentId)

    // Update comment with new information
    await comment.update(data)

    // We call the get comments here by sending in a new list comments with updated information
    const response = await getCommentsByArticleRef(req, res, next)

    // Returns the response from getCommentsByArticleRef controller
    return response
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addCommentByRef = async (req, res, next) => {
  try {
    const { refArticle, name, comment } = req.body

    const insertData = {
      refArticle,
      name,
      comment,
      likes: 0,
      dislikes: 0,
      refArticle: firestore.doc('articles/' + refArticle),
      createdDate: new Date(),
    }

    const docRef = await firestore.collection('comments').doc()

    await docRef.set(insertData)

    req.params.id = refArticle
    // We call the get comments here by sending in a new list comments with updated information
    const response = await getCommentsByArticleRef(req, res, next)
    // Returns the response from getCommentsByArticleRef controller
    return response
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// Extra Endpoint: delete comment by ID
const deleteCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params

    await firestore.collection('comments').doc(commentId).delete()

    // We call the get comments here by sending in a new list comments with updated information
    const response = await getCommentsByArticleRef(req, res, next)
    // Returns the response from getCommentsByArticleRef controller
    return response
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getCommentsByArticleRef,
  updateCommentByRef,
  addCommentByRef,
  deleteCommentById,
}
