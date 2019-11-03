"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discussion = (function () {
    function Discussion(title, id) {
        this.title = title;
        this.id = id;
    }
    Discussion.createEmptyDiscussion = function () {
        return new Discussion('', []);
    };
    return Discussion;
}());
exports.Discussion = Discussion;
//# sourceMappingURL=discussion.js.map