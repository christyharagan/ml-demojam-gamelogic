var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var markscript_uservices_1 = require('markscript-uservices');
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["ASTEROID"] = 0] = "ASTEROID";
    ObjectType[ObjectType["ENEMY_SHIP"] = 1] = "ENEMY_SHIP";
})(ObjectType || (ObjectType = {}));
var PlayerService = (function (_super) {
    __extends(PlayerService, _super);
    function PlayerService() {
        _super.apply(this, arguments);
    }
    PlayerService.prototype.register = function (name) {
        xdmp.documentInsert("/players/" + name + ".json", {
            score: 0,
            ranking: 0
        });
        return markscript_uservices_1.resolve(true);
    };
    PlayerService.prototype.incrementScore = function (name, increment, objectType) {
    };
    PlayerService.prototype.updateRanking = function (name) {
        return this.observableFactory().map(function (value) {
            return [parseInt(value.uri.substring('/guesses/'.length)), value.content.root.count];
        });
    };
    Object.defineProperty(PlayerService.prototype, "register",
        __decorate([
            markscript_uservices_1.mlMethod()
        ], PlayerService.prototype, "register", Object.getOwnPropertyDescriptor(PlayerService.prototype, "register")));
    Object.defineProperty(PlayerService.prototype, "incrementScore",
        __decorate([
            markscript_uservices_1.mlMethod()
        ], PlayerService.prototype, "incrementScore", Object.getOwnPropertyDescriptor(PlayerService.prototype, "incrementScore")));
    Object.defineProperty(PlayerService.prototype, "updateRanking",
        __decorate([
            markscript_uservices_1.mlEvent({
                scope: '/players'
            })
        ], PlayerService.prototype, "updateRanking", Object.getOwnPropertyDescriptor(PlayerService.prototype, "updateRanking")));
    PlayerService = __decorate([
        markscript_uservices_1.mlService('player')
    ], PlayerService);
    return PlayerService;
})(markscript_uservices_1.AbstractMLService);
exports.PlayerService = PlayerService;
//# sourceMappingURL=playerService.js.map