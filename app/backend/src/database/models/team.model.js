const Teams = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamname: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'team_name',
      },
    },
    { timestamps: false },
  );
  return Team;
};

module.exports = Teams;
