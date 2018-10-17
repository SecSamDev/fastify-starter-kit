const { Sequelize, Model } = require('sequelize')
const { loadSchema } = require('./schemas/user')
/**
 * @class User
 * Usuario de prueba para sequelizer
 * @attribute {string} username
 */
class User extends Model {

    getFullName() {
        return `${this.nombre} ${this.apellidos}`;
    }
    static associate(models) {
        //No asociations
    }
    static getId(where) {
        return this.findOne({
            where,
            attributes: ["id"],
            order: [["createdAt", "DESC"]]
        });
    }
    static getUsernameAndPassword(username, password) {
        return this.findOne({
            where : {
                username : username,
                password : password
            }
        });
    }
    static init(sequelize, DataTypes) {
        return super.init(loadSchema(DataTypes), {
            tableName: "usuarios",
            sequelize
        })
    }
    toJSON() {
        return {
            username: this.username,
            apellidos: this.apellidos,
            email: this.email,
            nombre: this.nombre,
            createdAt: this.createdAt.toDateString()
        }
    }

    /**
     * Definition of class atributes outside constructor, because we dont want to call the constructor
     * @private
     */
    _constructor() {
        /** @public Nombre de usuario @type {string} */
        this.username = "";
        /** @public Identificador de usuario en la BB.DD @type {number} */
        this.id = 1;
        /** @public Email del usuario @type {string} */
        this.email = "";
        /** @public Password del usuario @type {string} */
        this.password = "";
        /** @public Nombre de la persona @type {string} */
        this.nombre = "";
        /** @public Apellidos de la persona @type {string} */
        this.apellidos = "";
        /** @public Fecha de creación @type {Date} */
        this.createdAt = new Date();
        /** @public Fecha de actualización @type {Date} */
        this.updatedAt = new Date();

    }
}
module.exports.User = User;


