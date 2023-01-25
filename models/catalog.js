const user = (sequelize, DataTypes) => {
    return sequelize.define('catalog',
      {
        catalogid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        sellerid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true
        }
  
      }, {
      timestamps: false,
      tableName: 'catalog'
    })
  };
  
  module.exports = user;