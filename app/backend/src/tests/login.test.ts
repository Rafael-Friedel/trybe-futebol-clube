import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import * as bcrypt from 'bcryptjs';
import { Response } from 'superagent';
import User from '../database/models/User.model';
import IUser from '../interfaces/IUser.interface';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'any-user',
  email: 'any-email',
  password: 'any-password',
  role: 'any-role',
};

describe.only('users', () => {
  beforeEach(() => Sinon.restore());
  describe('/login', () => {
    it('should return 200 and a token', async () => {
      Sinon.stub(User, 'findOne').resolves();
      Sinon.stub(UserService, 'login').resolves();
      Sinon.stub(AuthService, 'createToken').resolves('any-token');
      const response: Response = await chai.request(app).post('/login');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal({ token: 'any-token' });
    });

    it('should return an error: All fields must be filled and 400', async () => {
      const response: Response = await chai
        .request(app)
        .post('/login')
        .send({ email: userMock.email });
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
      expect(response.status).to.equal(400);
    });

    it('should return an error: All fields must be filled and 400', async () => {
      const response: Response = await chai
        .request(app)
        .post('/login')
        .send({ password: userMock.password });
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
      expect(response.status).to.equal(400);
    });

    it('should return an error: Incorrect email or password and 401', async () => {
      Sinon.stub(User, 'findOne').resolves(undefined);
      const response: Response = await chai
        .request(app)
        .post('/login')
        .send(userMock);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Incorrect email or password',
      });
    });

    it('should return an error: Incorrect email or password and 401', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User);
      Sinon.stub(bcrypt, 'compare').resolves(undefined);
      const response: Response = await chai
        .request(app)
        .post('/login')
        .send(userMock);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('/validate', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and an role', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves(userMock.role);
      const response: Response = await chai.request(app).get('/login/validate');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal({ role: 'any-role' });
    });

    it('should return an error: Token must be a valid token and 401', async () => {
      const response: Response = await chai.request(app).get('/login/validate');
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });

    it('should return an error: Token must be a valid token and 401', async () => {
      const response: Response = await chai
        .request(app)
        .get('/login/validate')
        .send('any-token');

      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });

    it('should return an error: Token must be a valid token and 401', async () => {
      Sinon.stub(User, 'findOne').resolves(undefined);
      const response: Response = await chai
        .request(app)
        .get('/login/validate')
        .send('any-token');

      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });
  });
});
