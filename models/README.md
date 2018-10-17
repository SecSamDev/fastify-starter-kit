# Sequelize Models
Using ES6 classes.
The models extends the Model class of Sequelize,  we create a "init" static method in our models for initialization.
See [4.0 Model definition syntax](https://github.com/sequelize/sequelize/issues/6524)
Try to separate the schema code from the model code to make more easily acces it from our fastify routes to make posible the validation.
```
//In ./models/schemas/user.js
module.exports.publicSchema = {
        email: { type: 'string'},
        username: { type: 'string'},
        name: { type: 'string'},
        lastname: { type: 'string'},
        createdAt: { type: 'string'}
};
//In our route controller
const { privateSchema, publicSchema } = require('./models/schemas/user')
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
        ...
```