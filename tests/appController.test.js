import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Import the Express app

chai.use(chaiHttp);

describe('App Controller Tests', () => {
  // Test the /status endpoint
  it('should return Redis and DB status', (done) => {
    chai.request(app)
      .get('/status')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('redis').that.is.a('boolean');
        expect(res.body).to.have.property('db').that.is.a('boolean');
        done();
      });
  });

  // Test the /stats endpoint
  it('should return the number of users and files', (done) => {
    chai.request(app)
      .get('/stats')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('users').that.is.a('number');
        expect(res.body).to.have.property('files').that.is.a('number');
        done();
      });
  });

  // Test creating a new user
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email').that.equals('test@example.com');
        done();
      });
  });

  // Test retrieving user details (requires authentication token)
  it('should get user details', (done) => {
    // Simulating user authentication
    const fakeToken = 'some_valid_token'; // Replace with actual token generation logic
    chai.request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${fakeToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('email');
        done();
      });
  });
});
