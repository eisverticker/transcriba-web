"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TranscribaObject = (function () {
    function TranscribaObject(title, externalID, sourceID, discussionID, id, status) {
        this.title = title;
        this.externalID = externalID;
        this.sourceID = sourceID;
        this.discussionID = discussionID;
        this.id = id;
        this.status = status;
    }
    TranscribaObject.createEmptyObject = function () {
        return new TranscribaObject('', '', '', '');
    };
    return TranscribaObject;
}());
exports.TranscribaObject = TranscribaObject;
//# sourceMappingURL=transcriba-object.js.map