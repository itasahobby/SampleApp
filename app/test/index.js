// Import the dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
// Import the application to test
var app = require('../index');
// Configure Chai
chai.use(chaiHttp)
chai.should()
// Fake DB
const cities = require('../db/cities.json')

// Unit tests
describe('Homepage', () => {
  it('should show the hello world', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        response.text.should.equal("Hello World!")
        done()
      })
  });
})

// City API
describe('Testing city API', () => {
  it('should return the list of countries', done => {
    chai
      .request(app)
      .get('/api/city')
      .end((error, response) => {
        response.text.should.equal(JSON.stringify(cities))
        done()
      })
  });
  it('should return the first country', done => {
    chai
      .request(app)
      .get('/api/city/0')
      .end((error, response) => {
        response.text.should.equal(JSON.stringify(cities[0]))
        done()
      })
  });
  it('should return error when accessing wrong city', done => {
    chai
      .request(app)
      .get('/api/city/99')
      .end((error, response) => {
        response.should.status(404)
        done()
      })
  });
})