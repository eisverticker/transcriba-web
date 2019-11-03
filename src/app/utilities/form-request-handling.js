"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract class which provides an unified and simple interface for handling
 * forms which have a "loading" state
 */
var FormRequestHandling = (function () {
    function FormRequestHandling() {
        this.isRequestPending = false;
        this.isLastRequestFailed = false;
    }
    FormRequestHandling.prototype.watchRequestState = function (request) {
        var _this = this;
        this.isRequestPending = true;
        request.then(function (success) {
            _this.isLastRequestFailed = false;
            _this.isRequestPending = false;
        }, function (error) {
            _this.isLastRequestFailed = true;
            _this.isRequestPending = false;
        });
    };
    return FormRequestHandling;
}());
exports.FormRequestHandling = FormRequestHandling;
//# sourceMappingURL=form-request-handling.js.map