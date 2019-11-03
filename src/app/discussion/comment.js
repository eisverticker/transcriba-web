"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comment = (function () {
    function Comment(content, user, createdAt, id) {
        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
        this.id = id;
    }
    Comment.createEmptyComment = function () {
        return new Comment('');
    };
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map