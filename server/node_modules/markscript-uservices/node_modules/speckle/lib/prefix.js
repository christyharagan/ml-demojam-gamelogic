function prefix(name, prefix) {
    var self = {
        name: name,
        prefix: prefix,
        uri: function (suffix) {
            return {
                prefix: self,
                curi: name + ":" + suffix
            };
        }
    };
    return self;
}
exports.prefix = prefix;
var PrefixBuilder = (function () {
    function PrefixBuilder() {
        this.prefixes = {};
    }
    PrefixBuilder.prototype.addValue = function (value) {
        if (value.curi) {
            var prefix_1 = value.prefix;
            this.prefixes[prefix_1.name] = prefix_1;
        }
        return this;
    };
    PrefixBuilder.prototype.toSparql = function (sparql) {
        var prefixes = this.prefixes;
        var s = '';
        Object.keys(this.prefixes).forEach(function (name) {
            var prefix = prefixes[name];
            s += "PREFIX " + prefix.name + ": <" + prefix.prefix + ">\n";
        });
        return s + sparql;
    };
    return PrefixBuilder;
})();
exports.PrefixBuilder = PrefixBuilder;
//# sourceMappingURL=prefix.js.map