var value_1 = require('./value');
var prefix_1 = require('./prefix');
function _where(variables, prefixBuilder, statements, src, pred, obj) {
    prefixBuilder = prefixBuilder.addValue(src).addValue(pred).addValue(obj);
    statements.push([src, pred, obj]);
    return {
        toSparql: function () {
            var query = 'SELECT ';
            variables.forEach(function (variable) {
                query += "?" + variable.name + " ";
            });
            query += "WHERE {\n";
            for (var i = 0; i < statements.length - 1; i++) {
                var statement_1 = statements[i];
                query += value_1.v(statement_1[0]) + " " + value_1.v(statement_1[1]) + " " + value_1.v(statement_1[2]) + " .\n";
            }
            var statement = statements[statements.length - 1];
            query += value_1.v(statement[0]) + " " + value_1.v(statement[1]) + " " + value_1.v(statement[2]) + ";\n}";
            return prefixBuilder.toSparql(query);
        },
        and: _where.bind(null, variables, prefixBuilder, statements)
    };
}
function select() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i - 0] = arguments[_i];
    }
    return {
        where: _where.bind(null, variables, new prefix_1.PrefixBuilder(), [])
    };
}
exports.select = select;
//# sourceMappingURL=queryBuilder.js.map