"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeiElement = (function () {
    function TeiElement(type, properties, children, isDirty) {
        if (children === void 0) { children = []; }
        if (isDirty === void 0) { isDirty = false; }
        this.type = type;
        this.properties = properties;
        this.children = children;
        this.isDirty = isDirty;
        this.isValid = true;
        this.isFocused = false;
    }
    TeiElement.fromObject = function (obj) {
        var children = obj.children.map(function (child) { return TeiElement.fromObject(child); });
        return new TeiElement(obj.type, obj.properties, children, obj.isDirty);
    };
    return TeiElement;
}());
exports.TeiElement = TeiElement;
//# sourceMappingURL=tei-element.js.map