'use strict'
const fp = require('fastify-plugin')
const jwt = require('fastify-jwt')

module.exports = fp(async (fastify, opts) => {
    
    fastify.register(jwt, ('jwt' in opts) ? opts.jwt: { secret: 'supersecret' })
    try{
      fastify.decorate("authenticate", async (request, reply) => {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      })
    }catch(err){}
  })