"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Revision = (function () {
    function Revision(id, approved, createdAt, metadata, content, published, ownerId) {
        this.id = id;
        this.approved = approved;
        this.createdAt = createdAt;
        this.metadata = metadata;
        this.content = content;
        this.published = published;
        this.ownerId = ownerId;
    }
    return Revision;
}());
exports.Revision = Revision;
//# sourceMappingURL=revision.js.map