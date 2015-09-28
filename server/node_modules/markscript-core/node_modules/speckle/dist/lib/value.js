function v(vsc) {
    if (vsc.curi) {
        var curi = vsc;
        return "" + curi.curi;
    }
    else if (vsc.name) {
        return "?" + vsc.name;
    }
    else {
        return "<" + vsc + ">";
    }
}
exports.v = v;
//# sourceMappingURL=value.js.map