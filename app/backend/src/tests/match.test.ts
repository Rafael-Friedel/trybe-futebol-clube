import * as chai from 'chai';
import * as Sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import IMatch from '../interfaces/IMatch.interface';
import ITeam from '../interfaces/ITeam.interface';
import AuthService from '../services/auth.service';
import MatchService from '../services/match.service';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatch = {
  awayTeam: 1,
  awayTeamGoals: 5,
  homeTeam: 2,
  homeTeamGoals: 0,
  inProgress: true,
};

const matchMockError: IMatch = {
  awayTeam: 1,
  awayTeamGoals: 5,
  homeTeam: 1,
  homeTeamGoals: 0,
  inProgress: true,
};

const teamMock: ITeam = {
  id: 1,
  teamname: 'any-team',
};

describe('Match', () => {
  describe('getAll', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and a list of matches', async () => {
      Sinon.stub(Match, 'findAll').resolves([matchMock as Match]);
      const response: Response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal([matchMock]);
    });

    it('should return 500', async () => {
      Sinon.stub(Match, 'findAll').rejects();
      const response: Response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(500);
    });
  });

  describe('create', () => {
    beforeEach(() => Sinon.restore());
    it('should return 201 and the created match', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      Sinon.stub(MatchService, 'validTeams').resolves();
      Sinon.stub(Match, 'create').resolves(matchMock as Match);
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);

      expect(response.status).to.equal(201);
      expect(response.body).to.be.deep.equal;
    });

    it('should return an error: Token must be a valid token and 401', async () => {
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });

    it('should return an error: Token must be a valid token and 401', async () => {
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock)
        .auth('token-errado', { type: 'bearer' });
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });

    it('should return an error: "It is not possible to create a match with two equal teams" and 401', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMockError);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });

    it('should return an error: "There is no team with such id!" and 404', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      Sinon.stub(Team, 'findByPk').resolves(undefined);
      Sinon.stub(Team, 'findOne').resolves(undefined);
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);
      expect(response.status).to.equal(404);
      expect(response.body).to.be.deep.equal({
        message: 'There is no team with such id!',
      });
    });
    it('should return an error: "There is no team with such id!" and 404', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      Sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
      Sinon.stub(Team, 'findOne').resolves(undefined);
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);
      expect(response.status).to.equal(404);
      expect(response.body).to.be.deep.equal({
        message: 'There is no team with such id!',
      });
    });

    it('should return an error: "There is no team with such id!" and 404', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      Sinon.stub(Team, 'findByPk').resolves(undefined);
      Sinon.stub(Team, 'findOne').resolves(teamMock as Team);
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);
      expect(response.status).to.equal(404);
      expect(response.body).to.be.deep.equal({
        message: 'There is no team with such id!',
      });
    });

    it('should return 500', async () => {
      Sinon.stub(AuthService, 'validateToken').resolves();
      Sinon.stub(MatchService, 'validTeams').resolves();
      Sinon.stub(Match, 'create').rejects();
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchMock);

      expect(response.status).to.equal(500);
    });

    describe('finishMatch', () => {
      beforeEach(() => Sinon.restore());
      it('should return 200 and an message "Finished"', async () => {
        Sinon.stub(Match, 'update').resolves();
        const response: Response = await chai
          .request(app)
          .patch('/matches/1/finish')
          .send(matchMock);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Finished' });
      });
      it('should return 500', async () => {
        Sinon.stub(Match, 'update').rejects();
        const response: Response = await chai
          .request(app)
          .patch('/matches/1/finish')
          .send(matchMock);

        expect(response.status).to.equal(500);
      });
    });
    describe('update', () => {
      beforeEach(() => Sinon.restore());
      it('should return 500', async () => {
        Sinon.stub(Match, 'update').rejects();
        const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send(matchMock);
        expect(response.status).to.equal(500);
      });
      it('should return 200 and a message "Atualizado com sucesso"', async () => {
        Sinon.stub(Match, 'update').resolves();
        const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send(matchMock);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.deep.equal({
          message: 'Atualizado com sucesso',
        });
      });
    });
  });
});
