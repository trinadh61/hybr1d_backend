const user = (sequelize, DataTypes) => {
    return sequelize.define('orders',
      {
        orderid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        catalogid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
  
      }, {
      timestamps: false,
      tableName: 'orders'
    })
  };
  
  module.exports = user;