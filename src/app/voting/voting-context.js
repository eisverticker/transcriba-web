"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * VotingContext is a composite identifier which consists of
 * objectType (usually modelName like Comment or Revision)
 * and objectId (identifier of an entity in the objectType relation)
 */
var VotingContext = (function () {
    function VotingContext(objectType, objectId) {
        this.objectType = objectType;
        this.objectId = objectId;
    }
    return VotingContext;
}());
exports.VotingContext = VotingContext;
//# sourceMappingURL=voting-context.js.map