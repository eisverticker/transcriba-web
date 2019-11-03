"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Source = (function () {
    function Source(title, url, info_url, logo_url, type, sync, activated, id) {
        this.title = title;
        this.url = url;
        this.info_url = info_url;
        this.logo_url = logo_url;
        this.type = type;
        this.sync = sync;
        this.activated = activated;
        this.id = id;
    }
    Source.createEmptySource = function () {
        return new Source('', '', '', '', 'transcribajson', false, true);
    };
    return Source;
}());
exports.Source = Source;
//# sourceMappingURL=source.js.map