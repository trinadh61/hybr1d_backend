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

sequelize.sync();



