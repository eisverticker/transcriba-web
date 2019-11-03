"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./role");
var User = (function () {
    function User(name, mail, password, roles, id) {
        if (roles === void 0) { roles = []; }
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.roles = roles;
        this.id = id;
    }
    User.createEmptyUser = function () {
        return new User('', '', '', []);
    };
    User.createGuest = function () {
        return new User('Guest', '', '', []);
    };
    User.isGuest = function (user) {
        return user.name === 'Guest';
    };
    ;
    User.prototype.equals = function (user) {
        return this.name === user.name;
    };
    User.prototype.isRegistered = function () {
        return this.hasOneOfTheseRoles(role_1.Role.getAvailableRoles().map(function (role) { return role.name; }));
    };
    User.prototype.isAdministrator = function () {
        return this.hasRole('administrator');
    };
    User.prototype.isEmployee = function () {
        return this.hasRole('employee');
    };
    User.prototype.isTrusted = function () {
        return this.hasRole('trusted');
    };
    User.prototype.hasRole = function (roleName) {
        return this.hasOneOfTheseRoles([roleName]);
    };
    User.prototype.hasOneOfTheseRoles = function (roleNames) {
        return this.roles.reduce(function (result, currentElement) {
            return result || (roleNames.indexOf(currentElement.name) !== -1);
        }, false);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map