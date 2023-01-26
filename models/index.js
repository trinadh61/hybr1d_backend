const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json')['db_config'];
const basename = path.basename(__filename);

let db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter( file => {
    return file.indexOf('.') != 0 && file != basename && file.slice(-3) == '.js'
}).forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize); 
    db[model.name] = model;
})



db.catalog.belongsToMany(db.product, {through: db.catalog_product_mapping,foreignKey:'catalogid',otherKey : 'productid', sourceKey :'catalogid'})
db.product.belongsToMany(db.orders, {through :db.order_product_mapping, foreignKey:'productid', sourceKey : 'productid', otherKey : 'orderid'})
db.orders.belongsToMany(db.product, {through: db.order_product_mapping,foreignKey:'orderid',otherKey : 'productid', sourceKey : 'orderid'})
db.orders.belongsTo(db.catalog, {foreignKey : "catalogid"})


db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();

module.exports = db



