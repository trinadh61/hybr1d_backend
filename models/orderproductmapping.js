
const order_product_mapping = (sequelize, DataTypes) => {
    return sequelize.define('order_product_mapping',
      {
        orderid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey:true
        },
        productid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey:true
        }
      }, {
      timestamps: false,
      tableName: 'order_product_mapping',
    })
  };
  
  module.exports = order_product_mapping;