const firebase = require('../db')
const Issue = require('../models/issue')
const firestore = firebase.firestore()

// These are controller function that define how to get and submit data to Firestore
// They will be called in the route pages where the endpoints live
// Each one has a condition for what happens to the data when something
// is successful and when something fails

const getIssues = async (req, res, next) => {
  try {
    // Async function that returns a promise
    const issues = await firestore.collection('issues')

    // We wait until it resolves and get the data and store it in data variable
    const data = await issues.get()

    // We build an array which will be returned inside response
    const issueArray = []

    if (data.empty) {
      // If nothing in data return this
      res.status(404).send('No issues found')
    } else {
      // Take each data item and iterate over it so we can build an article object to
      data.forEach((a) => {
        const issue = new Issue(
          a.id,
          a.data().firstName,
          a.data().lastName,
          a.data().email,
          a.data().subject,
          a.data().text,
          a.data().createdDate
        )
        issueArray.push(issue)
      })

      // .send automatically sends a status of 200 and a json object
      // articleArray will be all articles as an object
      res.send(issueArray)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addIssue = async (req, res, next) => {
  const { firstName, lastName, email, subject, text } = req.body

  // Create data object from request body
  const data = {
    firstName,
    lastName,
    email,
    subject,
    text,
    createdDate: new Date(),
  }

  try {
    // Async function that returns a promise
    // We take the object in the body and pass it as data and
    // Create the document inside the issues collection
    await firestore.collection('issues').doc().set(data)

    res.status(201).send({ msg: 'Issue logged' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// Extra endpoint
const deleteIssueById = async (req, res, next) => {
  try {
    const { id } = req.params

    await firestore.collection('issues').doc(id).delete()

    res.status(200).send({ msg: 'Issue deleted' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { addIssue, deleteIssueById, getIssues }
