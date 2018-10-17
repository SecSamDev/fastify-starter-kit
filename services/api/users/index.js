'use strict'
const { privateSchema, publicSchema } = require('../../../models/schemas/user')
const { User } = require('../../../models/user')
const { Conflict,InternalServerError } = require('http-errors')

async function routes(fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: privateSchema
            },
            querystring: {
                type: 'object',
                properties: {
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: privateSchema
                }
            }
        },
        handler: async (req, res) => {
            /**@type {User}*/
            const user = fastify.sequelize.models.User;
            try{
                let usr = await user.create(req.body);
                return usr
            }catch(err){
                if(!!err.errors && err.errors.length > 0 && err.errors[0].message){
                    if(err.errors[0].type == 'unique violation'){
                        throw new Conflict(err.errors[0].message);
                    }else{
                        throw new InternalServerError(err.errors[0].message);
                    }
                }
                throw new InternalServerError('maybe duplicated?');
                
            }
        }
    });
    //Route protected by token
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: publicSchema
                    }
                }
            }
        },
        beforeHandler: [fastify.authenticate],
        handler: async (req, res) => {
            /**@type {User}*/
            const user = fastify.sequelize.models.User;
            /**@type {User[]}*/
            let usrs = await user.findAll();
            usrs = usrs.map((usr) => {
                return usr.toJSON();
            })
            return usrs;
        }
    });
}
module.exports = routes;