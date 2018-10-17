module.exports.loadSchema = function(DataTypes){
    return {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, defaultValue: "" },
        apellidos: { type: DataTypes.STRING, defaultValue: "" },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    }
};
module.exports.publicSchema = {
        email: { type: 'string'},
        username: { type: 'string'},
        nombre: { type: 'string'},
        apellidos: { type: 'string'},
        createdAt: { type: 'string'}
};
module.exports.privateSchema = {
    id: { type: 'number'},
    email: { type: 'string'},
    username: { type: 'string'},
    password: { type: 'string'},
    nombre: { type: 'string'},
    apellidos: { type: 'string'},
    createdAt: { type: 'string'},
    updatedAt: { type: 'string'},
};