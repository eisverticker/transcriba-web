"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notification = (function () {
    function Notification(message, tags) {
        this.message = message;
        this.tags = tags;
    }
    Notification.message = function (msg) {
        return new Notification(msg, []);
    };
    Notification.timeout = function () {
        return new Notification('request.timeout', ['timeout', 'fail']);
    };
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map