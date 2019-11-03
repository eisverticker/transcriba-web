"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfoPage = (function () {
    function InfoPage(name, content, show_discussion, discussionID, id) {
        this.name = name;
        this.content = content;
        this.show_discussion = show_discussion;
        this.discussionID = discussionID;
        this.id = id;
    }
    InfoPage.createEmptyPage = function () {
        return new InfoPage('', '', true);
    };
    return InfoPage;
}());
exports.InfoPage = InfoPage;
//# sourceMappingURL=info-page.js.map