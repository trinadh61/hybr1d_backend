const user = (sequelize, DataTypes) => {
    return sequelize.define('product',
      {
        productid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        productname: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
  
      }, {
      timestamps: false,
      tableName: 'product'
    })
  };
  
  module.exports = user;