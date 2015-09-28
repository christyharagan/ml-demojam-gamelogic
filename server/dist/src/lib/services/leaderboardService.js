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
var LeaderboardService = (function (_super) {
    __extends(LeaderboardService, _super);
    function LeaderboardService() {
        _super.apply(this, arguments);
    }
    LeaderboardService.prototype.updateLeaderboard = function () {
        return this.observableFactory().map(function (value) {
            return [parseInt(value.uri.substring('/guesses/'.length)), value.content.root.count];
        });
    };
    Object.defineProperty(LeaderboardService.prototype, "updateLeaderboard",
        __decorate([
            markscript_uservices_1.mlEvent({
                scope: '/players/'
            })
        ], LeaderboardService.prototype, "updateLeaderboard", Object.getOwnPropertyDescriptor(LeaderboardService.prototype, "updateLeaderboard")));
    LeaderboardService = __decorate([
        markscript_uservices_1.mlService('leaderboard')
    ], LeaderboardService);
    return LeaderboardService;
})(markscript_uservices_1.AbstractMLService);
exports.LeaderboardService = LeaderboardService;
//# sourceMappingURL=leaderboardService.js.map