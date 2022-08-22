import * as chai from 'chai';
import * as Sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/Team.model';
import ITeam from '../interfaces/ITeam.interface';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamname: 'any-team',
};

describe('team', () => {
  describe('/teams', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and a list of teams', async () => {
      Sinon.stub(Team, 'findAll').resolves([teamMock as Team]);
      const response: Response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal([teamMock]);
    });
    it('should return 500', async () => {
      Sinon.stub(Team, 'findAll').rejects();
      const response: Response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(500);
    });
  });

  describe('/teams/:id', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200', async () => {
      Sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
      const response: Response = await chai.request(app).get('/teams/1');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal(teamMock);
    });

    it('should return 500', async () => {
      Sinon.stub(Team, 'findByPk').rejects();
      const response: Response = await chai.request(app).get('/teams/1');
      expect(response.status).to.equal(500);
    });
  });
});
