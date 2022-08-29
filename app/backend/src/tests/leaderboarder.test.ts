import * as chai from 'chai';
import { Op } from 'sequelize';
import * as Sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import db from '../database/models';
import ClassificationTable from '../interfaces/ClassificationTable.interface';

// @ts-ignore
import chaiHttp = require('chai-http');

// 'sequelize/types/lib/operators';
chai.use(chaiHttp);

const { expect } = chai;

const tableMock: ClassificationTable = {
  name: 'any-team',
  totalPoints: 3,
  totalGames: 2,
  totalVictories: 1,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 2,
  goalsOwn: 1,
  goalsBalance: 1,
  efficiency: '50.00',
};

const tableMockResult: ClassificationTable = {
  name: 'any-team',
  totalPoints: 6,
  totalGames: 4,
  totalVictories: 2,
  totalDraws: 2,
  totalLosses: 0,
  goalsFavor: 4,
  goalsOwn: 2,
  goalsBalance: 2,
  efficiency: '50.00',
};

describe('leaderboard', () => {
  describe('/home', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and a classification table correct', async () => {
      Sinon.stub(db, 'query').resolves([[tableMock], Op.any] as [
        ClassificationTable[],
        unknown
      ]);
      const response: Response = await chai
        .request(app)
        .get('/leaderboard/home');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([tableMock]);
    });
    it('should return 500', async () => {
      Sinon.stub(db, 'query').rejects();
      const response: Response = await chai
        .request(app)
        .get('/leaderboard/home');
      expect(response.status).to.equal(500);
    });
  });

  describe('/away', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and a classification table correct', async () => {
      Sinon.stub(db, 'query').resolves([[tableMock], Op.any] as [
        ClassificationTable[],
        unknown
      ]);
      const response: Response = await chai
        .request(app)
        .get('/leaderboard/away');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([tableMock]);
    });

    it('should return 500', async () => {
      Sinon.stub(db, 'query').rejects();
      const response: Response = await chai
        .request(app)
        .get('/leaderboard/away');
      expect(response.status).to.equal(500);
    });
  });

  describe('leaderboard', () => {
    beforeEach(() => Sinon.restore());
    it('should return 200 and a classification table correct', async () => {
      Sinon.stub(db, 'query').resolves([[tableMock], Op.any] as [
        ClassificationTable[],
        unknown
      ]);
      const response: Response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([tableMockResult]);
    });

    it('should return 500', async () => {
      Sinon.stub(db, 'query').rejects();
      const response: Response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.equal(500);
    });
  });
});
