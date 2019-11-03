"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection = (function () {
    function Collection(name, description, isPublic, isLocked, id) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.isLocked = isLocked;
        this.id = id;
    }
    Collection.createEmptyCollection = function () {
        return new Collection('', '', true, false);
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map