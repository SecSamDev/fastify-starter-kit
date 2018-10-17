'use strict'

const userRoutes = require('./users/index');
const authRoutes = require('./auth/index');

/**
 * Ruta usada para cargar todas las subrutas que cualgan de /api: /api/users, /api/data
 */
module.exports = async (fastify, opts) => {
    fastify.register(async(fast,opt)=>{
        fastify.register(userRoutes,{prefix: '/users'})
        fastify.register(authRoutes,{prefix: '/auth'})
    }, {
        prefix: '/api',
    })
    
}