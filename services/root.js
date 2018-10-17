'use strict'

async function routes(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: {
                name: { type: 'string' },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: { type: 'string' }
                    }
                }
            }
        },
        handler: async (req, res) => {
            return { hello: 'world' + req.query.name }
        }
    });
    //Route protected by token
    fastify.route({
        method: 'GET',
        url: '/protected',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: { type: 'string' }
                    }
                }
            }
        },
        beforeHandler: [fastify.authenticate],
        handler: async (req, res) => {
            return { hello: 'protected' }
        }
    });
    //Route to get a TOKEN
    fastify.route({
        method: 'GET',
        url: '/token',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        },
        handler: async (req, res) => {
            const token = fastify.jwt.sign({ user : 1 })
            return { token }
        }
    })
}
module.exports = routes;