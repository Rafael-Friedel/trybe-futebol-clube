// const Users = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       username: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//       role: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//       email: {
//         allowNull: false,
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       password: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//     },
//     { timestamps: false },
//   );
//   return User;
// };

// module.exports = Users;
