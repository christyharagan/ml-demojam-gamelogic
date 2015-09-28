var value_1 = require('./value');
var prefix_1 = require('./prefix');
function rule(name) {
    return _rule('', new prefix_1.PrefixBuilder(), name);
}
exports.rule = rule;
function _rule(ruleSet, pb, name) {
    return {
        when: _when.bind(null, ruleSet, name, [], pb)
    };
}
function _when(ruleSet, ruleName, ands, pb, src, pred, obj) {
    pb.addValue(src).addValue(pred).addValue(obj);
    ands.push([src, pred, obj]);
    return {
        and: _when.bind(null, ruleSet, ruleName, ands, pb),
        then: function (src, pred, obj) {
            pb.addValue(src).addValue(pred).addValue(obj);
            ruleSet += "\nrule \"" + ruleName + "\" CONSTRUCT {\n  " + value_1.v(src) + " " + value_1.v(pred) + " " + value_1.v(obj) + "\n}{";
            for (var i = 0; i < ands.length - 1; i++) {
                var and_1 = ands[i];
                ruleSet += "\n  " + value_1.v(and_1[0]) + " " + value_1.v(and_1[1]) + " " + value_1.v(and_1[2]) + " .";
            }
            var and = ands[ands.length - 1];
            ruleSet += "\n  " + value_1.v(and[0]) + " " + value_1.v(and[1]) + " " + value_1.v(and[2]) + "\n}";
            return {
                toSparql: function () {
                    return pb.toSparql(ruleSet);
                },
                rule: _rule.bind(null, ruleSet, pb)
            };
        }
    };
}
//# sourceMappingURL=ruleBuilder.js.map