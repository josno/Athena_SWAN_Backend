// Create a class model using constructors to format
// the data that will be returned from the server

class Issue {
  constructor(id, firstName, lastName, email, subject, text, createdDate) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.subject = subject
    this.text = text
    this.createdDate = createdDate
  }
}

module.exports = Issue
