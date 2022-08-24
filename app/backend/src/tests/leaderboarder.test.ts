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
  totalPoints: 1,
  totalGames: 1,
  totalVictories: 1,
  totalDraws: 1,
  totalLosses: 1,
  goalsFavor: 1,
  goalsOwn: 1,
  goalsBalance: '1',
  efficiency: '100.00',
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
});
