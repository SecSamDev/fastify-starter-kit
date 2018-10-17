
module.exports = {
    sequelize: {
        instance: 'sequelize', // the name of fastify plugin instance.
        autoConnect: true, // auto authentication and test connection on first run

        // other sequelize config goes here
        dialect: 'sqlite',

        // SQLite only
        storage: 'A:\\Workspace\\fastify-starter-kit\\db\\db.sqlite'
    },
    jwt : {
        secret : 'SECRET@_12345_@SECRET'
    }
}