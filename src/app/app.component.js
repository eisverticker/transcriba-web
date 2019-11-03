"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_toasty_1 = require("ng2-toasty");
var ng2_translate_1 = require("ng2-translate");
var i18n_helper_service_1 = require("./i18n/i18n-helper.service");
var notification_service_1 = require("./utilities/notification.service");
// import { Notification } from './utilities/notification';
var app_service_1 = require("./utilities/app.service");
var auth_service_1 = require("./loopback-auth/auth.service");
// Add the RxJS Observable operators we need in this app.
require("./rxjs-operators");
var AppComponent = (function () {
    function AppComponent(translate, notify, auth, i18n, app, toastyService, toastyConfig) {
        this.translate = translate;
        this.notify = notify;
        this.auth = auth;
        this.i18n = i18n;
        this.app = app;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.isWideLayout = false;
        this.i18n.detectUserLanguage();
        this.toastyConfig.theme = 'bootstrap';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initNotificationHandler();
        // watch whether user is logged in or not
        this.auth.user.subscribe(function (user) { return _this.user = user; });
        this.auth.loadUser().then(function (user) { return _this.user = user; });
        // watch if a module needs a wide page
        this.app.layout.subscribe(function (type) {
            if (type === app_service_1.LayoutType.wide) {
                _this.isWideLayout = true;
            }
            else {
                _this.isWideLayout = false;
            }
        });
    };
    AppComponent.prototype.processNotificationMessage = function (message, tags) {
        if (tags.indexOf('success') !== -1) {
            // this.toastr.success(message);
            this.toastyService.success(message);
        }
        else if (tags.indexOf('fail') !== -1 ||
            tags.indexOf('error') !== -1) {
            // this.toastr.error(message);
            this.toastyService.error(message);
        }
        else {
            // this.toastr.info(message);
            this.toastyService.info(message);
        }
    };
    AppComponent.prototype.initNotificationHandler = function () {
        var _this = this;
        this.notify.messages.subscribe(function (notification) {
            if (notification.tags.indexOf('untranslated') !== -1) {
                _this.processNotificationMessage(notification.message, notification.tags);
            }
            else {
                _this.translate.get(notification.message).subscribe(function (translatedMessage) { return _this.processNotificationMessage(translatedMessage, notification.tags); });
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-app',
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService,
        notification_service_1.NotificationService,
        auth_service_1.AuthService,
        i18n_helper_service_1.I18nHelperService,
        app_service_1.AppService,
        ng2_toasty_1.ToastyService,
        ng2_toasty_1.ToastyConfig])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map