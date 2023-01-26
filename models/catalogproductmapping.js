const product = require('./products')
const catalog = require('./catalog')


const catalog_product_mapping = (sequelize, DataTypes) => {
    return sequelize.define('catalog_product_mapping',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        catalogid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
        
  
      }, {
      timestamps: false,
      tableName: 'catalog_product_mapping'
    })
  };
  
  module.exports = catalog_product_mapping;