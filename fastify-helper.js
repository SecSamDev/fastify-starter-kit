class Fastify{
    /**
     * 
     * @param {string} path the path of the url to match this route
     * @param {FastifyOptions} options 
     * @param {Function} handler 
     */
    get(path,options,handler){}
    head(path,[options],handler){}
    post(path,[options],handler){}
    put(path,[options],handler){}
    delete(path,[options],handler){}
    options(path,[options],handler){}
    patch(path,[options],handler){}
    /**
     * Fastify full declarations
     * @param {FastifyOptions} options options
     */
    route(options){}
}
/**
 * @property {string} method currently it supports 'DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT' and 'OPTIONS'. It could also be an array of methods.
 * @property {string} url the path of the url to match this route (alias: path).
 * @property {{body : any,querystring:any,params:any,response:any}} schema the path of the url to match this route (alias: path).
 */
const FastifyOptions = {
    method: 'GET',
    url: '/',
    schema: {
        body : {},
        querystring: {},
        params: {},
        response: {}
    },
    beforeHandler: function (request, reply,done) {
    },
    handler: function (request, reply) {
    },
    schemaCompiler: function (schema) {
    },
    bodyLimit : 1000,
    logLevel : 'S',
    version : 1
}

module.exports = Fastify;