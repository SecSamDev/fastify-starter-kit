'use static'

/*
 * Use this array to define all models that you want to import
 */

const {join} = require('path')
const Sequelize= require('sequelize');

const {User} = require('./user');


/**
 * Imports all models from this folder
 * @param {Sequelize.Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const models = {
        User : User.init(sequelize,Sequelize)
    }
    console.log("Importing models...")
    Object.values(models)
        .filter(model => typeof model.associate === "function")
        .forEach(model => {
            model.associate(models)
            model.sync({ force: process.env.NODE_ENV != 'production' });
            console.log(` - ${model.name}`)
        });
}