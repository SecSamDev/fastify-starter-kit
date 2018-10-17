'use strict'
const { User } = require('../../../models/user')
const { Forbidden } = require('http-errors')
async function routes(fastify, opts) {
    //Route to get a TOKEN
    fastify.route({
        method: 'POST',
        url: '/signin',
        schema: {
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username : {type : 'string'},
                    password : {type : 'string'}
                }
            },
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
            /**@type {User}*/
            const user = fastify.sequelize.models.User;
            /**@type {User}*/
            let usr = user.getUsernameAndPassword(req.body.username, req.body.password)
            if(usr != null){
                const token = fastify.jwt.sign({ username: usr.username })
                return { token }
            }else{
                throw new Forbidden('Failed to log in')
            }
            
        }
    })
}
module.exports = routes;