import Team from '../database/models/Team.model';

class TeamsService {
  static async getAll() {
    const allTeams = await Team.findAll();
    return allTeams;
  }

  static async getById(id: number) {
    const team = await Team.findByPk(id);
    return team;
  }
}

export default TeamsService;
