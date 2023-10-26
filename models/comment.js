// Create a class model using constructors to format
// the data that will be returned from the server

class Comment {
  constructor(id, comment, name, createdDate, dislikes, likes) {
    this.id = id
    this.comment = comment
    this.name = name
    this.createdDate = createdDate
    this.dislikes = dislikes
    this.likes = likes
  }
}

module.exports = Comment
