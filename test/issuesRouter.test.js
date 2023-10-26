const request = require('supertest')('http://localhost:8080/api/v1')
const expect = require('chai').expect

describe('POST /issues/', function () {
  it('submits a new issue', async function () {
    const inputObj = {
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'email@email.com',
      subject: 'Subject Test',
      text: 'This is a test comment',
    }
    const res = await await request.post(`/issues`).send(inputObj)

    expect(res.status).to.eql(201)
    expect(res.body.msg).to.eql('Issue logged')
  })
})
