const user = (sequelize, DataTypes) => {
  return sequelize.define('user',
    {
      userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type:DataTypes.STRING,
        allowNull : false,
      },
      usertype: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    }, {
    timestamps: false,
    tableName: 'user'
  })
};

module.exports = user;