// Create a class model using constructors to format
// the data that will be returned from the server

class Article {
  constructor(
    id,
    name,
    title,
    writtenBy,
    createdDate,
    categories = [],
    content,
    photoUrl,
    likes
  ) {
    this.id = id
    this.name = name
    this.title = title
    this.writtenBy = writtenBy
    this.createdDate = createdDate
    this.categories = categories
    this.content = content
    this.photoUrl = photoUrl
    this.likes = likes
  }
}

module.exports = Article
