// Import the dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
// Import the application to test
var app = require('../index');
// Configure Chai
chai.use(chaiHttp)
chai.should()

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
  })
})