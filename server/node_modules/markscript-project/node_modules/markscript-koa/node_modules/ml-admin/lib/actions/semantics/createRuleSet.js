var createDocument_1 = require('../documents/createDocument');
function createRuleSet(client, config, ruleSet) {
    return createDocument_1.createDocument(client, {
        uri: config.path
    }, ruleSet);
}
exports.createRuleSet = createRuleSet;
//# sourceMappingURL=createRuleSet.js.map