"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var PaginationComponent = (function () {
    function PaginationComponent(itemsPerPage, numOfItems) {
        if (itemsPerPage === void 0) { itemsPerPage = 12; }
        if (numOfItems === void 0) { numOfItems = 0; }
        this.itemsPerPage = itemsPerPage;
        this.numOfItems = numOfItems;
        this.paginator = new Rx_1.BehaviorSubject(0);
        this.pageChanged = this.paginator.asObservable();
    }
    Object.defineProperty(PaginationComponent.prototype, "numOfItems", {
        get: function () {
            return this._numOfItems;
        },
        // Custom Getter and Setter
        set: function (value) {
            this._numOfItems = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (value) {
            this._itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.getNumOfPages = function () {
        return Math.ceil(this.numOfItems / this.itemsPerPage);
    };
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map