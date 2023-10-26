const request = require('supertest')('http://localhost:8080/api/v1')
const expect = require('chai').expect

describe('GET /articles', function () {
  it('returns all articles', async function () {
    const response = await request.get('/articles')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('array')
  })
})

describe('GET /article/:id', function () {
  it('returns a specific article', async function () {
    const response = await request.get('/articles')
    const target = response.body[0]
    const res = await request.get(`/article/${target.id}`)

    expect(res.status).to.eql(200)
    expect(res.body).to.have.all.keys(
      'id',
      'name',
      'title',
      'writtenBy',
      'createdDate',
      'content',
      'categories',
      'photoUrl',
      'likes'
    )
  })
})

describe('PUT /article/:id', function () {
  it('returns a specific article', async function () {
    const response = await request.get('/articles')
    const target = response.body[0]

    const newName =
      target.writtenBy === 'Test Person' ? 'Another Test Name' : 'Test Person'

    target.writtenBy = newName

    const res = await request.put(`/article/${target.id}`).send(target)

    expect(res.status).to.eql(200)
    expect(res.body).to.have.all.keys(
      'id',
      'name',
      'title',
      'writtenBy',
      'createdDate',
      'content',
      'categories',
      'photoUrl',
      'likes'
    )
    expect(res.body.writtenBy).to.eql(newName)
  })
})
