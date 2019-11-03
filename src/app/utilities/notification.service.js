"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var NotificationService = (function () {
    function NotificationService() {
        this.subject = new Rx_1.Subject();
        this.messages = this.subject.asObservable();
    }
    NotificationService.prototype.notify = function (data) {
        this.subject.next(data);
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map