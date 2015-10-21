(function (METHOD) {
    METHOD[METHOD["POST"] = 0] = "POST";
    METHOD[METHOD["PUT"] = 1] = "PUT";
})(exports.METHOD || (exports.METHOD = {}));
var METHOD = exports.METHOD;
function mlService(name) {
    return function (target) {
        return target;
    };
}
exports.mlService = mlService;
function mlMethod(options) {
    return function (target, propertyKey, descriptor) {
    };
}
exports.mlMethod = mlMethod;
function mlEvent(options) {
    return function (target, propertyKey, descriptor) {
    };
}
exports.mlEvent = mlEvent;
//# sourceMappingURL=decorators.js.map