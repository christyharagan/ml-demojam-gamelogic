(function (METHOD) {
    METHOD[METHOD["POST"] = 0] = "POST";
    METHOD[METHOD["PUT"] = 1] = "PUT";
})(exports.METHOD || (exports.METHOD = {}));
var METHOD = exports.METHOD;
function methodToString(method) {
    switch (method) {
        case METHOD.PUT:
            return 'PUT';
        case METHOD.POST:
        default:
            return 'POST';
    }
}
exports.methodToString = methodToString;
//# sourceMappingURL=model.js.map