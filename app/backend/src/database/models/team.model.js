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
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
  );
  return Team;
};

module.exports = Teams;
