'use strict'

const fp = require('fastify-plugin')
const Sequelize = require('sequelize')
const registerModels = require('../models/index')

async function plugin(fastify, options) {
  const instance = (options.sequelize && options.sequelize.instance) || 'sequelize'
  const autoConnect = (options.sequelize && options.sequelize.autoConnect) || true
  let sequelize = new Sequelize(
    (!!options.sequelize) ?
      options.sequelize :
      { instance, autoConnect }
  )
  registerModels(sequelize);
  if (autoConnect) {
    return sequelize.authenticate().then(decorate)
  }
  sequelize.sync()
  decorate()
  return Promise.resolve();

  function decorate() {
    fastify.decorate(instance, sequelize)
    fastify.addHook('onClose', (fastifyInstance, done) => {
      sequelize.close()
        .then(done)
        .catch(done)
    })
  }
}

module.exports = fp(plugin)