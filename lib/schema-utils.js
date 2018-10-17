const Sequelize = require('sequelize')
function schema2response(sch) {
    let schK = Object.keys(sch);
    return schK.reduce((total, current, i, arr) => {
        if (!!sch[current]) {
            let type = convertDataType(sch[current].type)
            if (type == 'object' && !!sch[current].properties) {
                total[current] = {
                    type: 'object',
                    properties: schema2response(sch[current].properties)
                }
            }else{
                total[current] = {type}
            }
        }
        return total;
    }, {})
}
function convertDataType(dataType) {
    switch (dataType) {
        case Sequelize.INTEGER:
            return 'integer'
        case Sequelize.NUMBER:
            return 'number'
        case Sequelize.STRING:
            return 'string'
        case Sequelize.ARRAY:
            return 'array'
        case Sequelize.BOOLEAN:
            return 'boolean'
        case Sequelize.FLOAT:
            return 'number'
        case Sequelize.DATE:
            return 'string'
        default:
            throw new Error('Not implemented yet!!!!')
    }
}

module.exports.schema2response = schema2response;