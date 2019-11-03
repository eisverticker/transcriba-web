"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Role = (function () {
    function Role(name, id) {
        this.name = name;
        this.id = id;
    }
    ;
    Role.getAvailableRoles = function () {
        if (config_1.configData.roles === undefined) {
            return [
                new Role('registered'),
                new Role('administrator')
            ];
        }
        else {
            return config_1.configData.roles.map(function (role) { return new Role(role); });
        }
    };
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=role.js.map