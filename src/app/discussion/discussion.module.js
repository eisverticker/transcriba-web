"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// components
var comment_component_1 = require("./comment.component");
var discussion_component_1 = require("./discussion.component");
var discussion_widget_component_1 = require("./discussion-widget.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var voting_module_1 = require("../voting/voting.module");
var i18n_module_1 = require("../i18n/i18n.module");
var utility_module_1 = require("../utilities/utility.module");
var auth_module_1 = require("../loopback-auth/auth.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var http_1 = require("@angular/http");
// services
var discussion_service_1 = require("./discussion.service");
var comment_voting_service_1 = require("./comment-voting.service");
var DiscussionModule = (function () {
    function DiscussionModule() {
    }
    return DiscussionModule;
}());
DiscussionModule = __decorate([
    core_1.NgModule({
        declarations: [
            comment_component_1.CommentComponent,
            discussion_component_1.DiscussionComponent,
            discussion_widget_component_1.DiscussionWidgetComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            i18n_module_1.I18nModule,
            http_1.HttpModule,
            utility_module_1.UtilityModule,
            auth_module_1.AuthModule,
            voting_module_1.VotingModule,
            gadget_module_1.GadgetModule
        ],
        exports: [
            comment_component_1.CommentComponent,
            discussion_component_1.DiscussionComponent,
            discussion_widget_component_1.DiscussionWidgetComponent
        ],
        bootstrap: [],
        providers: [
            discussion_service_1.DiscussionService,
            comment_voting_service_1.CommentVotingService
        ]
    })
], DiscussionModule);
exports.DiscussionModule = DiscussionModule;
//# sourceMappingURL=discussion.module.js.map